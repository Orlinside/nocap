/**
 * Un tableau des routes accessibles par tout le monde et qui ne nécessitent pas de connexion
 * @type {string[]}
 */

export const publicRoutes = [
  "/",
  "/commentaires",
  "/contact",
  "/mentions-legales",
  "/politique-de-confidentialite",
  "/not-found",
];

/**
 * Un tableau des routes utilisées pour l'authentification.
 * Ces routes ... (à compléter)
 * @type {string[]}
 */

export const authRoutes = [
  "/connexion",
  "/inscription",
  "/error",
  "/reset",
  "/nouveau-mot-de-passe",
];

export const adminRoutes = ["/admin"];

export const adminPrefix = "/admin";

/**
 * Le préfix pour les routes API utilisées pour l'authentification.
 * Les routes qui commencent par ce préfixe sont utilisées pour l'authentification.
 * @type {string}
 */
export const apiAuthPrefix = "/api/auth";

export const apiUploadPrefix = "/api/uploadthing";

export const apiEmailPrefix = "/api/email";

export const DEFAULT_LOGIN_REDIRECT = "/";
