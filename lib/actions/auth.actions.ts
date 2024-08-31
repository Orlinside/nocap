"use server";
import * as z from "zod";
import { db } from "../db";
import bcrypt from "bcryptjs";
import {
  newPasswordSchema,
  ResetSchema,
  userLoginSchema,
  userRegisterSchema,
} from "../validator";

import { getUserByEmail } from "./user.actions";

import { signIn, signOut } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/route";
import { AuthError } from "next-auth";
import { revalidatePath } from "next/cache";

//! LOGIN ACTION
export const login = async (values: z.infer<typeof userLoginSchema>) => {
  // Revalidation des champs dans le back-end (où personne peut les manipuler)
  const validateFields = userLoginSchema.safeParse(values);

  if (!validateFields.success) {
    return { error: "Formulaire Invalide" };
  }

  const { email, password } = validateFields.data;

  const existingUser = await getUserByEmail(email);
  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: "Identifiants invalides." };
  }

  const passwordMatch = await bcrypt.compare(password, existingUser.password);
  if (!passwordMatch) {
    return { error: "Identifiants invalides." };
  }

  // La fonction signIn vient de NextAuth importé depuis "auth.ts"
  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
    return { success: "Vous êtes connecté." };
  } catch (error) {
    // Ici, on récupère les erreurs envoyé par nextAuth en fonction du type d'erreur
    if (error instanceof AuthError) {
      switch (error.type) {
        // Si le type d'erreur est "Credentials"
        case "CredentialsSignin":
          return { error: "Identifiants incorrects." };
        default:
          return { error: "Identifiants incorrects." };
      }
    }
    // (A compléter)
    throw error;
  }
};

//! REGISTER ACTION
export const register = async (values: z.infer<typeof userRegisterSchema>) => {
  const validateFields = userRegisterSchema.safeParse(values);

  if (!validateFields.success) {
    return { error: "Formulaire Invalide" };
  }

  const { email, password, passwordConfirmation, name, role } =
    validateFields.data;

  if (password !== passwordConfirmation) {
    return { error: "Les mots de passe ne correspondent pas." };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return { error: "Cet utilisateur existe déjà." };
  }

  await db.user.create({
    data: {
      email,
      password: hashedPassword,
      name: name,
      role,
    },
  });

  return {
    success: "Votre compte a bien été créé.",
  };
};

//! LOGOUT ACTION
export const logout = async (pathname: string) => {
  // On peut dans cette fonction supprimer des cookies ou des tokens de session du User par exemple
  await signOut();
  revalidatePath(pathname);
};
