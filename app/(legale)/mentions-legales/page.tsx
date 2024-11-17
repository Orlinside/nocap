import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mentions Légales | No Cap",
  description:
    "Mentions Légales",
  openGraph: {
    images: [
      { url: "https://www.nocap.fr/api/opengraph", width: 1200, height: 630 },
    ],
  },
};


export default function page() {
  return (
    <>
      <section className="wrapper">
        <div className="mt-28 sm:mt-20"></div>
        <h1 className="renogare text-2xl uppercase">Mentions Légales</h1>
      </section>
      <section className="wrapper flex flex-col gap-8">
        <div className="flex flex-col sm:grid sm:grid-cols-2 gap-4">
          <div>
            <h2 className="renogare text-xl">Propriétaire du site</h2>
            <p>Nom du propriétaire du site : ....</p>
            <p>Adresse postale : ....</p>
            <p>Adresse mail: ....</p>
            <p>Numéro de téléphone : ....</p>
          </div>

          <div>
            <h3 className="text-xl renogare">Hébergeur du site :</h3>
            <p>Nom de l&apos;hébergeur : Vercel</p>
            <p>Adresse : San Francisco</p>
            <p>Coordonnées : https://www.vercel.com</p>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <h2 className="renogare text-xl">Propriété intellectuelle</h2>
          <p>
            La structure générale ainsi que les textes, sons, son savoir-faire
            et tous les autres éléments composant le site sont la proproété
            exclusive de www.nocapdsvr.fr
          </p>
          <p>
            Les logos et marques des sociétés citées sur le site
            www.nocapdsvr.fr sont la propriété exclusive de leurs auteurs
            respectifs. Toutes représentations et/ou reproductions et/ou
            exploitation partielle ou totale de ce site, par quelques procédés
            que ce soit, sans l&apos;autorisation expresse et préalable de
            www.nocapdsvr.fr est interdite et constituerait une contrefaçon au
            sens des articles L 335-2 et suivants du Code de la propriété
            intellectuelle.
          </p>
          <p>
            L&apos;élaboration de liens hypertextes profonds vers le site
            www.nocapdsvr.fr est interdite sans l&apos;accord exprès et
            préalable de www.nocapdsvr.fr. Par ailleurs, l&apos;utilisation des
            informations contenues sur le site relève de la seule responsabilité
            de l&apos;utilisateur. Nous ne pourrions en aucun cas, et pour
            quelque cause que ce soit, en être tenus pour responsables, et ce,
            quelque en soit les conséquences. Nous ne sommes responsables
            d&apos;aucune erreur ou omission sur le présent site.
          </p>
          <p>
            Les photos et les illustrations utilisées sur le site
            www.nocapdsvr.fr sont la propriété de leurs auteurs respectifs.
            Toute reproduction totale ou partielle de ces éléments sans
            l&apos;autorisation expresse de leurs auteurs est interdite.
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <h2 className="renogare text-xl">Avertissement Général</h2>
          <p>
            La consultation du site www.nocapdsvr.fr est proposée aux
            internautes à titre gratuit et sans aucune garantie de la part de
            son éditeur. Les informations disponibles sur ce site qui
            proviendrait de sources extérieures ne saurait garantir
            qu&apos;elles sont exemptes d&apos;erreurs, ni garantir leur
            complétude, leur actualité, leur exhaustivité ou autre.
          </p>
          <p>
            Les propriétaires des sites marchands, de services, sites persos,
            site informatiques (etc.) consultés à partir du site
            www.nocapdsvr.fr sont seuls responsables du respect par eux de
            l&apos;ensemble des réglementations s&apos;appliquant dans le cadre
            des prestations offertes aux clients finaux, et notamment, des lois
            et réglements relatif à : la vente à distance, la protection du
            consommateur, la publicité mensongère ou trompeuse, les prix, la
            conformité des produits.
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <h2 className="renogare text-xl">Crédit & Copyright</h2>
          <p>
            Les crédits et copyright des visuels et des photos présents sur le
            blog www.nocapdsvr.fr sont signalés lorsqu&apos;elles proviennent
            d&apos;un professionnel avec son accord. Toutes les photos présentes
            sur ce site sont la propriété de leurs auteurs et du propriétaire du
            site. Elles ont été prise drant les événements organisés par le
            propriétaire du site. Toute reproduction totale ou partielle de ces
            éléments sans l&apos;autorisation expresse de leurs auteurs est
            interdite.
          </p>
        </div>
      </section>
    </>
  );
}
