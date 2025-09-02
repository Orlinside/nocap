"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { formUrlQuery } from "@/lib/utils";
import { FaCalendarAlt, FaChevronDown } from "react-icons/fa";

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
    <div className="w-full max-w-6xl mx-auto px-2">
      {/* Desktop View */}
      <div className="hidden sm:block">
        <div className="p-2">
          {/* <div className="flex items-center gap-2 mb-2">
            <FaCalendarAlt className="text-white/60 text-xs" />
            <span className="text-white/80 font-mono text-xs tracking-wider">
              SOIRÉES
            </span>
          </div> */}

          <div className="flex gap-1.5">
            {party.map((p: any, idx: number) => {
              const partyPage = idx + 1;
              const isActive = partyPage === page;
              const date = new Date(p.startDateTime);
              const formattedDate = date.toLocaleDateString("fr-FR", {
                day: "2-digit",
                month: "2-digit",
                year: "2-digit",
              });

              return (
                <button
                  key={p.id}
                  onClick={() => goToPage(partyPage)}
                  className={`group relative overflow-hidden p-2 transition-all duration-200 rounded-xl border backdrop-blur-sm text-left ${
                    isActive
                      ? "bg-gradient border-white/40 shadow-md scale-102"
                      : "bg-white/5 hover:bg-white/15 border-white/10 hover:border-white/30"
                  }`}
                >
                  <div className="w-full flex flex-col">
                    <div
                      className={`text-[10px] font-mono leading-tight ${
                        isActive ? "text-white" : "text-white/70"
                      }`}
                    >
                      {formattedDate}
                    </div>
                    <div
                      className={`text-[10px] renogare font-bold leading-tight truncate ${
                        isActive ? "text-white" : "text-white/80"
                      }`}
                    >
                      {p.name}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Mobile View */}
      <div className="sm:hidden">
        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-3">
          <div className="flex items-center gap-2 mb-2">
            <FaCalendarAlt className="text-white/60 text-xs" />
            <span className="text-white/80 font-mono text-xs tracking-wider">
              SOIRÉES
            </span>
          </div>

          <div className="relative">
            <select
              value={page}
              onChange={(e) => goToPage(Number(e.target.value))}
              className="w-full bg-white/10 border border-white/20 rounded-lg text-white px-3 py-2 font-mono text-xs appearance-none cursor-pointer focus:outline-none focus:border-white/40 transition-colors"
            >
              {party.map((p: any, idx: number) => {
                const partyPage = idx + 1;
                const date = new Date(p.startDateTime);
                const formattedDate = date.toLocaleDateString("fr-FR", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "2-digit",
                });
                return (
                  <option
                    key={p.id}
                    value={partyPage}
                    className="bg-black text-white"
                  >
                    {p.name} • {formattedDate}
                  </option>
                );
              })}
            </select>

            <div className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none">
              <FaChevronDown className="text-white/60 text-xs" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
