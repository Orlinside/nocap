import { db } from "./db";
import { v4 as uuidv4 } from "uuid";

import { getPasswordResetTokenByEmail } from "./actions/password-reset";

//! GENERATION DU TOKEN POUR RESET DU PASSWORD
export const generatePasswordResetToken = async (email: string) => {
  // Générer un token unique avec uuidv4
  const token = uuidv4();
  // Le token va expirer 1 heure après sa génération
  const expires = new Date(new Date().getTime() + 3600 * 1000);

  // Vérifier si un token existe déjà pour cet email, si oui, le supprimer
  const existingToken = await getPasswordResetTokenByEmail(email);
  if (existingToken) {
    await db.passwordResetToken.delete({
      where: {
        id: existingToken.id,
      },
    });
  }

  // Nouveau token de reset du password
  const passwordResetToken = await db.passwordResetToken.create({
    data: {
      email,
      token,
      expires,
    },
  });

  return passwordResetToken;
};
