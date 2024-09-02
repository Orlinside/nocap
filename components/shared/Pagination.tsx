"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "../ui/button";
import { formUrlQuery } from "@/lib/utils";

type PaginationProps = {
  page: number;
  totalPages: number;
  urlParamName: string;
};

export const Pagination = ({
  page,
  totalPages,
  urlParamName,
}: PaginationProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const onClick = (btnType: string) => {
    // Si le type du bouton est "next" alors on incrémente la page sinon on décrémente
    const pageValue = btnType === "next" ? Number(page) + 1 : Number(page) - 1;

    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      key: urlParamName || "page",
      value: pageValue.toString(),
    });

    router.push(newUrl, { scroll: false });
  };

  return (
    <div className="flex gap-2">
      {Number(page) >= 2 && (
        <Button
          size="sm"
          variant="outline"
          onClick={() => onClick("prev")}
          disabled={Number(page) <= 1}
          className="rounded-xl renogare text-[0.8rem] uppercase tracking-widest border-none hover:text-white/80"
        >
          Revenir
        </Button>
      )}

      <Button
        size="sm"
        variant="outline"
        onClick={() => onClick("next")}
        disabled={Number(page) >= totalPages}
        className="renogare uppercase text-[0.8rem] tracking-widest border-none hover:text-white/80"
      >
        Précédemment
      </Button>
    </div>
  );
};
