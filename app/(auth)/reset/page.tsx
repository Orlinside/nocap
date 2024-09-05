import { ResetForm } from "@/components/auth/ResetForm";

export default function ResetRoute() {
  return (
    <>
      <section className="wrapper ">
        <div className="mt-28 sm:mt-20"></div>
        <div className="flex justify-center items-center">
          <ResetForm />
        </div>
      </section>
    </>
  );
}
