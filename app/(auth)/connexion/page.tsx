import { LoginForm } from "@/components/auth/Card/LoginForm";
import React, { Suspense } from "react";

export default function ConnexionPage() {
  return (
    <>
      <section className="flex-center mt-8">
        <Suspense>
          <LoginForm />
        </Suspense>
      </section>
    </>
  );
}
