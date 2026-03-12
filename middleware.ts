/**
 * Importation de authConfig depuis le fichier auth.config.ts et de Next-Auth
 * Création de la constante auth qui prend en paramètre authConfig
 * Protéger toutes les routes par défaut et rendre public seulement celle que l'on veut
 */

import authConfig from "./auth.config";
import NextAuth from "next-auth";

import {
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  publicRoutes,
  authRoutes,
  adminRoutes,
  apiUploadPrefix,
  apiEmailPrefix,
} from "./route";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req;

  const isLoggedIn = !!req.auth; // Vérifier si l'utilisateur est connecté ou non en convertissant req.auth en booléen

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix); // Vérifier si la route est une route d'authentification

  const isApiUploadRoute = nextUrl.pathname.startsWith(apiUploadPrefix); // Vérifier si la route est une route d'upload

  const isEmailApiRoute = nextUrl.pathname.startsWith(apiEmailPrefix); // Vérifier si la route est une route d'envoi d'email

  // const isPublicRoute = isPublicRouteFonction(nextUrl.pathname); // Vérifier si la route est publique
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname); // Vérifier si la route est publique

  const isAuthRoute = authRoutes.includes(nextUrl.pathname); // Vérifier si la route est une route d'authentification

  const isAdminRoute = adminRoutes.includes(nextUrl.pathname); // Vérifier si la route est une route d'administrateur

  // Vérifier si la route est /nouveau-mot-de-passe avec un token en paramètre
  const isResetPasswordRoute =
    nextUrl.pathname.startsWith("/nouveau-mot-de-passe") &&
    nextUrl.searchParams.has("token");

  /**
   * ! L'ordre des conditions est important !
   * On check d'abord si c'est une API Route, ensuite si c'est une route d'authentification, et enfin si c'est une route publique et s'il le user est connecté ou non
   * A la fin, on autorise l'accès aux routes qui restent
   */
  if (isApiAuthRoute) {
    return; // Correction Erreur : Retourne void au lieu de null pour éviter les erreurs de type
  }

  if (isApiUploadRoute) {
    return;
  }

  if (isEmailApiRoute) {
    return;
  }

  if (isAuthRoute) {
    // Si l'utilisateur est connecté et qu'il essaie d'accéder à une route d'authentification, le rediriger vers la page par défaut
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl)); // le second paramètre est fait pour créer l'URL absolue (/profil ne suffit pas pour la redirection)
    }
    return;
  }

  if (isResetPasswordRoute) {
    // Autoriser l'accès à la route de réinitialisation du mot de passe avec un token
    return;
  }

  if (!isLoggedIn && !isPublicRoute) {
    console.log(
      "Redirection vers la page de connexion car la route n'est pas publique et l'utilisateur n'est pas connecté."
    );
    return Response.redirect(new URL("/", nextUrl));
  }

  if (isAdminRoute) {
    if (!isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    if (isLoggedIn && req.auth?.user.email !== process.env.MAIL) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    // L'utilisateur est connecté et a le rôle d'administrateur, il peut accéder à la route
    return;
  }

  return;
});

// //! Sert a indiquer les routes où invoquer la fonction auth juste au dessus
export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};

