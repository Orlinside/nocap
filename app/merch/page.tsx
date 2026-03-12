import Image from "next/image";
import { RemainingViewportHeight } from "@/components/shared/RemainingViewportHeight";
import { Transition } from "@/components/shared/Transition";

export default function MerchPage() {
  return (
    <Transition>
      <RemainingViewportHeight className="relative w-full overflow-hidden text-white">
        <div className="pointer-events-none absolute inset-0 z-0">
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse at 60% 40%, rgba(252,0,16,0.06) 0%, transparent 55%), radial-gradient(ellipse at 20% 80%, rgba(254,157,1,0.04) 0%, transparent 50%)",
            }}
          />
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
              backgroundSize: "64px 64px",
            }}
          />
        </div>

        <div className="relative z-10 mx-auto flex h-full w-full max-w-[1600px] items-center justify-center px-4 py-4 md:px-8 lg:px-12 lg:py-6">
          <div className="relative w-full max-w-5xl border-y border-white/15 py-16 sm:py-20 lg:py-24">
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden">
              <div className="relative h-52 w-52 sm:h-72 sm:w-72 xl:h-[30rem] xl:w-[30rem]">
                <Image
                  src="/logo/logo_cancel.png"
                  alt=""
                  fill
                  className="object-contain opacity-[0.09] blur-sm"
                  aria-hidden="true"
                />
              </div>
            </div>

            <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-8">
              {/* <p className="text-[11px] uppercase tracking-[0.3em] text-white/60">
                No Cap Merch
              </p> */}
              <h1 className="renogare mt-4 text-3xl uppercase leading-[1.05] text-white sm:text-4xl lg:text-6xl">
                Beautiful outfit for{" "}
                <span className="bg-gradient-to-r from-orange-300 via-orange-400 to-amber-500 bg-clip-text !text-transparent dark:!text-transparent">
                  beautiful people
                </span>
              </h1>
            </div>
          </div>
        </div>
      </RemainingViewportHeight>
    </Transition>
  );
}
