import NewPasswordForm from "@/components/auth/NewPasswordForm";
import { Suspense } from "react";

export default function NewPasswordPage() {
  return (
    <>
      <section className="wrapper ">
        <div className="mt-28 sm:mt-20"></div>
        <div className="flex justify-center items-center">
          <Suspense>
            <NewPasswordForm />
          </Suspense>
        </div>
      </section>
    </>
  );
}
