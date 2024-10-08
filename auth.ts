import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth, { type DefaultSession } from "next-auth";

import authConfig from "./auth.config";
import { db } from "./lib/db";

import { Role } from "@prisma/client";

import { getUserById } from "./lib/actions/user.actions";
import { getAccountByUserId } from "./lib/actions/account";

//! Pour éviter les erreurs de type (erreur de type pour session.user.role : il ne reconnait pas "role")
type ExtentedUser = DefaultSession["user"] & {
  role: Role; // ou bien : role : "user" | "admin";
  isOAuth: boolean;
  id: string;
};

declare module "next-auth" {
  interface Session {
    user: ExtentedUser;
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  pages: {
    signIn: "/",
    error: "/", // Redirige vers NOTRE page d'erreur si il y a une erreur
  },
  events: {
    // Quand on se connecte avec Google, l'email est déjà vérifié donc on le met à jour directement dans la base de données
    async linkAccount({ user }) {
      await db.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() },
      });
    },
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider !== "credentials") return true;

      const existingUser = user.id ? await getUserById(user.id) : null;
      if (!existingUser) return false;

      return true;
    },

    async session({ token, session }) {
      // Ici, le but est de rajouter l'ID du User dans la session (car il n'y ai pas de base) :
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (token.role && session.user) {
        session.user.role = token.role as ExtentedUser["role"];
      }

      if (session.user) {
        session.user.name = token.name;
        session.user.email = token.email as string;
        session.user.isOAuth = token.isOAuth as boolean;
      }

      return session;
    },
    async jwt({ token }) {
      // console.log("JWT CALLBACK", token); : Quand on affiche le token, on voit que le "sub" correspond à l'id du user
      // Pour ajouter le rôle du user à la session, on passe par le token car c'est grâce à celui ci que le middleware va autoriser ou non l'accès à certaines routes
      // Le rôle va être ajouté au dessus dans la session
      if (!token.sub) return token;

      const existingUser = await getUserById(token.sub);
      if (!existingUser) return token;

      // Récupérer le compte d'un user connecté avec Google
      const existingAccount = await getAccountByUserId(existingUser.id);

      token.isOAuth = !!existingAccount;

      token.name = existingUser.name;
      token.email = existingUser.email;

      token.role = existingUser.role;
      return token;
    },
  },
  // On passe la DB à PrismaAdapter
  adapter: PrismaAdapter(db),
  // On change la stratégie de session : avec prisma, on doit utiliser "jwt"
  session: { strategy: "jwt" },
  // On passe la config d'auth.config
  ...authConfig,
});
