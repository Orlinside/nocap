import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Politique de Confidentialité | No Cap",
  description:
    "Page d'accueil de No Cap, présentant la soirée à venir et les soirées passées.",
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
        <h1 className="renogare text-2xl uppercase">
          Politique de Confidentialité
        </h1>
      </section>
      <section className="wrapper flex flex-col gap-8">
        <p>
          {" "}
          Le but de cette Politique de Confidentialité est d&apos;informer les
          utilisateurs de notre site des données personnelles que nous
          recueillerons ainsi que les informations suivantes : <br /> - les
          données personnelles recueillies <br /> - l&apos;utilisation faite de
          ces données <br /> - les destinataires de ces données <br /> - la
          durée de conservation de ces données <br /> - les droits des
          utilisateurs concernant ces données <br /> - la politique du site en
          matière de cookies
        </p>

        <div className="flex flex-col gap-2">
          <h2 className="renogare text-xl">Loi Applicable</h2>
          <p>
            Conformément au Règlement général sur la protection des données
            (RGPD), cette politique de confidentialité est conforme aux
            régleements suivant.
          </p>
          <p>
            Les données à caractère personnel doivent être : <br /> <br /> -
            traitées de manière licite, loyale et transparente au regard de la
            personne concernée (licéité, loyauté, transparence) ; <br /> <br />{" "}
            - collectées pour des finalités déterminées, explicites et
            légitimes, et ne pas être traotées ultérieurement d&apos;une manière
            incompatble avec ces finalités; le traitement ultérieur à des fin
            archivistiques dans l&apos;intérêt public, à des fins de recherche
            scientifique ou historique ou à des fins statistiques n&apos;est pas
            considéré, conformément à l&apos;article 89, paragraphe 1, comme
            incompatible avec les finalités initiales (limitation des finalités)
            ;<br /> <br /> - adéquates, pertinentes et limitées à ce qui est
            nécessare au regard des finalités pour lesquelles elles sont
            traitées (minimisation des données ;) <br /> <br /> - exactes et, si
            nécessaire, tenues à jour; toutes les mesures raisonnables doivent
            être prises pour que les données à caractère personnel qui sont
            inexactes, eu égard aux finalités pour lesquelles elles sont
            traitées, soient effacées ou rectifiées sans tarder (exactitude) ;{" "}
            <br /> <br />- conservées sous une forme permettant
            l&apos;identification des personnes concernées pendant une durée
            n&apos;excédant pas celle nécessaire au regard des finalités pour
            lesquelles elles sont traitées; les données à caractère personnel
            peuvent être conservées pour des durées plus longues dans la mesure
            où elles seront traitées exclusivement à des fins archivistiques
            dans l&apos;intérêt public, à des fins de recherche scientifique ou
            historique ou à des fins statistiques conformément à l&apos;article
            89, paragraphe 1, pour autant que soient mises en œuvre les mesures
            techniques et organisationnelles appropriées requises par le présent
            règlement en vue de garantir les droits et libertés de la personne
            concernée (limitation de la conservation) ; <br /> <br />- traitées
            de manière à garantir une sécurité appropriée des données à
            caractère personnel, y compris la protection contre le traitement
            non autorisé ou illicite et contre la perte, la destruction ou les
            dégâts d&apos;origine accidentelle, à l&apos;aide de mesures
            techniques ou organisationnelles appropriées (intégrité et
            confidentialité).
          </p>
          <p>
            Le traitement n&apos;est licite que si, et dans la mesure où, au
            moins une des conditions suivantes est remplie : <br />
            <br /> - la personne concernée a consenti au traitement de ses
            données à caractère personnel pour une ou plusieurs finalités
            spécifiques ; <br />
            <br /> - la traitement est nécessaire à l&apos;exécution d&apos;un
            contrat auquel la personne concernée est partie ou à
            l&apos;exécution de mesures précontractuelles prises à la demande de
            celle-ci ;
            <br />
            <br /> -le traitement est nécessaire au respect d&apos;une
            obligation légale à laquelle le responsable du traitement est soumis
            ; <br />
            <br /> - le traitement est nécessaire à la sauvegarde des intérêts
            vitaux de la personne concernée ou d&apos;une autre personne
            physique ; <br />
            <br /> - le traitement est nécessaire à l&apos;exécution d&apos;une
            mission d&apos;intérêt public ou relevant de l&apos;exercice de
            l&apos;autorité publique dont est investi le responsable du
            traitement ; <br />
            <br /> - le traitement est nécessaire aux fins des intérêts
            légitimes poursuivis par le responsable du traitement ou par un
            tiers, à moins que ne prévalent les intérêts ou les libertés et
            droits fondamentaux de la personne concernée qui exigent une
            protection des données à caractère personnel, notamment lorsque la
            personne concernée est un enfant.
            <br />
            <br /> - la durée de conservation de ces données <br />
            <br /> - les droits des utilisateurs concernant ces données <br />
            <br /> - la politique du site en matière de cookies.
          </p>
          <p>
            Pour les résidents de l&apos;Etat de Californie, cette politique de
            confidentialité vise à se conformer à la California Consumer Privacy
            Act (CCPA). S&apos;il y a des incohérences entre ce document et la
            CCPA, la législation de l&apos;Etat s&apos;appliquera. Si nous
            constatons des incohérences, nous modifierons notre politique pour
            nous conformer à la loi pertinente.
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <h2 className="renogare text-xl">Consentement</h2>
          <p>
            Les utilisateurs conviennent qu&apos;en utilisantt notre site, ils
            consentent à :
            <br />
            <br /> - les conditions énoncées dans la présente politique de
            confidentialité
            <br />
            <br /> - la collecte, l&apos;utilisation et la conservation des
            données énoncées dans la présente politique de confidentialité
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <h2 className="renogare text-xl">
            Données personnelles que nous collections
          </h2>
          <p>
            Données collectées automatiquement : Nous ne collections aucune
            donnée automatiquement sur notre site.
          </p>
          <p>
            Données recueillies de façon non automatique : Nous pouvons
            également collecter les donnéees suivantes lorsque vous effectuez
            certaines fonctions sur notre site : Nom, Prénom et Email. Ces
            données peuvent être recueillies au moyen des méthodes suivantes :
            formulaire de contact, inscription pour accéder aux fonctionnalités
            du site.
          </p>
          <p>
            Veuillez notez que nous ne collectons que les données qui nous
            aident à atteindre l&apos;objectif énoncé dans cette politique de
            confidentialité. Nous ne recueillerons pas de données
            supplémentaires sans vous informer au préalable.
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <h2 className="renogare text-xl">
            Avec qui nous partagerons les données personnelles
          </h2>
          <p>
            Employés : les informations de contact pourront être utilisé par les
            personnes en charge de vous répondre ou de vous contacter.
          </p>
          <p>
            Autres divulgations : Nous nous engageons à ne pas vendre ou
            partager vos données avec des tiers, sauf dans les cas suivants : si
            la loi l&apos;exige, si elle est requise pour toute procédure
            judiciaire, pour prouver ou protéger nos droits légaux, à des
            acheteurs ou des acheteurs potentiels de cette société dans le cas
            où nous cherchons à la vendre.
          </p>
          <p>
            Si vous suivez des hyperliens de notre site vers un autre site,
            veuillez noter que nous ne sommes pas responsables et n&apos;avons
            pas de contrôle sur leurs politiques et pratiques de
            confidentialité.{" "}
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <h2 className="renogare text-xl">
            Combien de temps nous stockons les données personnelles
          </h2>
          <p>
            Les données d&apos;inscription sont conservées jusqu&apos;à la
            suppression du compte ou du service.
          </p>
          <p>
            Alors que nous prenons toutes les précautions raisonnables pour nous
            assurer que nos données d&apos;utilisateur sont sécurisées et que
            les utilisateurs sont protégés, il reste toujours du risque de
            préjudice. L&apos;Internet en sa totalité peut être, parfois, peu
            sûr et donc nous sommes incapables de garantir la sécurité des
            données des utilisateurs au-delà de ce qui est raisonnablement
            pratique.
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <h2 className="renogare text-xl">Mineurs</h2>
          <p>
            Le RGPD précise que les personnes de moins de 15 ans sont
            considérées comme des mineurs aux fins de la collecte de données.
            Les mineurs doivent avoir le consentement d&apos;un représentant
            légal pour que leurs données soient recueillies, traitées et
            utilisées.
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <h2 className="renogare text-xl">
            Vos droits en tant qu&apos;utilisateur
          </h2>
          <p>
            En vertu du RGPD, les utilisateurs ont les droits suivant en tant
            que personnes concernées : <br /> - droit d&apos;accès <br /> -
            droit de rectification
            <br /> - droit à l&apos;effacement <br /> - droit de restreindre le
            traitement <br /> - droit à la portabilité des données <br /> -
            droit d&apos;objection{" "}
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <h2 className="renogare text-xl">
            Comment modifier, supprimer ou contester les données recueillies
          </h2>
          <p>
            Si vous souhaitez que vos renseignements soient supprimés ou
            modifiés d&apos;une façon ou d&apos;une autre, veuillez communiquer
            avec notre agent de protection de la vie privée ici :{" "}
          </p>
          <p>Nom d&apos;une personne : - le mail de la personne</p>
        </div>

        <div className="flex flex-col gap-2">
          <h2 className="renogare text-xl">Modifications</h2>
          <p>
            Cette politique de confidentialité peut être modifiée à
            l&apos;occasion afin de maintenir la conformité avec la loi et de
            tenir compte de tout changement à notre processus de collecte de
            données. Nous recommandons à nos utilisateurs de vérifier notre
            politique de temps à autre pour s&apos;assurer qu&apos;ils soient
            informés de toute mise à jour. Au besoin, nous pouvons informer les
            utlisateurs par courriel des changements apportés à cette politique.
          </p>
        </div>
      </section>
    </>
  );
}
