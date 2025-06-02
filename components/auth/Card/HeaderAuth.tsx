import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

interface HeaderAuthProps {
  label: string;
}

export const HeaderAuth = ({ label }: HeaderAuthProps) => {
  return (
    <div className="w-full flex flex-col gap-y-2 items-center justify-center">
      <Link href="/" className="text-2xl font-bold renogare tracking-widest">
        <Image
          src="/logo/Logo_NoCapR_white.png"
          alt="logo"
          width={175}
          height={100}
          className="cursor-pointer z-[200]"
        />
      </Link>
      <p className="text-muted-foreground text-center text-xs mt-2 renogare tracking-widest">
        {label}
      </p>
    </div>
  );
};
