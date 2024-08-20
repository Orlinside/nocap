import { LoginForm } from "@/components/auth/Card/LoginForm";
import React, { Suspense } from "react";

export default function ConnexionPage() {
  return (
    <>
      <section className="flex-center flex-col mt-8">
        {/* <div>
          <p className="w-full text-[1rem] text-center">
            Tu en as besoin pour mettre ton commentaires ! Pas de panique, ca ne
            dure que 2 minutes...
          </p>
        </div> */}
        <Suspense>
          <LoginForm />
        </Suspense>
      </section>
    </>
  );
}
