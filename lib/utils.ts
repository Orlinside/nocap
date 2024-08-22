import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import qs from "query-string";
import { UrlQueryParams, RemoveUrlQueryParams } from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const convertFileToUrl = (file: File) => URL.createObjectURL(file);

//! Construction d'une chaine de requête URL à partir d'un ensemble de paramètres données :
export function formUrlQuery({ params, key, value }: UrlQueryParams) {
  // On analyse la chaine de requête URL (params) avec qs.parse qui transforme la chaine de requête en objet
  const currentUrl = qs.parse(params);

  // On met à jour la valeur du paramètre (key) avec la valeur (value) donnée en argument
  currentUrl[key] = value;

  // On utilise qs.stringifyUrl pour transformer l'objet en chaine de requête URL
  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query: currentUrl,
    },
    { skipNull: true } // On ignore les valeurs null
  );
}
