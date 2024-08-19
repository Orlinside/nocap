import RegisterForm from "@/components/auth/Card/RegisterForm";
import React, { Suspense } from "react";

export default function InscriptionPage() {
  return (
    <>
      <section className="flex-center mt-8">
        <Suspense>
          <RegisterForm />
        </Suspense>
      </section>
    </>
  );
}
