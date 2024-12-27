import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

//! Fonction pour envoyer un email de réinitialisation du mot de passe
export const sendPasswordResetEmail = async (email: string, token: string) => {
  // Changer l'url pour la production
  const resetLink = `${process.env.NEXTAUTH_URL}/nouveau-mot-de-passe?token=${token}`;

  // Envoyer l'email
  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "No Cap | Réinitialiser votre mot de passe",
    html: `
    <h1>NO CAP | Réinitialiser votre mot de passe</h1>
    <p>Cliquez sur le lien suivant pour réinitialiser votre mot de passe: <a href="${resetLink}">Cliquez ici</a></p>
    <p>Si vous n'avez pas demandé de réinitialisation de mot de passe, veuillez ignorer cet email.</p>`,
  });
};
