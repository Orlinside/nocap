"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { formUrlQuery } from "@/lib/utils";

type PaginationProps = {
  page: number;
  totalPages: number;
  urlParamName: string;
  party: any[];
};

export const PartyList = ({
  page,
  totalPages,
  urlParamName,
  party,
}: PaginationProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const goToPage = (pageNumber: number) => {
    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      key: urlParamName || "page",
      value: pageNumber.toString(),
    });

    router.push(newUrl, { scroll: false });
  };

  return (
    <>
      <div className="hidden sm:flex flex-wrap gap-2 justify-center">
        {party.map((p: any, idx: number) => {
          const partyPage = idx + 1;
          const isActive = partyPage === page;
          const date = new Date(p.startDateTime);
          const formattedDate = date
            .toLocaleDateString("fr-FR", {
              day: "2-digit",
              month: "2-digit",
              year: "2-digit",
            })
            .replace(
              /(\d{2})\/(\d{2})\/(\d{4})/,
              (_, d, m, y) => `${d}/${m}/${y.slice(-2)}`
            );
          return (
            <button
              key={p.id}
              onClick={() => goToPage(partyPage)}
              className={`px-4 py-2 rounded-t-[10px] text-sm transition-colors shadowXL font-mono ${
                isActive
                  ? "bg-black/60 text-white font-semibold"
                  : "bg-black/30 text-white/40 hover:bg-black/80 hover:text-white/80"
              }`}
            >
              {isActive ? `${p.name} - ${formattedDate}` : formattedDate}
            </button>
          );
        })}
      </div>

      <div className="sm:hidden w-full">
        <select
          value={page}
          onChange={(e) => goToPage(Number(e.target.value))}
          className="w-full rounded-xl bg-black/60 text-white text-xs px-4 py-2 font-mono"
        >
          {party.map((p: any, idx: number) => {
            const partyPage = idx + 1;
            const date = new Date(p.startDateTime);
            const formattedDate = date
              .toLocaleDateString("fr-FR", {
                day: "2-digit",
                month: "2-digit",
                year: "2-digit",
              })
              .replace(
                /(\d{2})\/(\d{2})\/(\d{4})/,
                (_, d, m, y) => `${d}/${m}/${y.slice(-2)}`
              );
            return (
              <option key={p.id} value={partyPage}>
                {p.name} - {formattedDate}
              </option>
            );
          })}
        </select>
      </div>
    </>
  );
};
