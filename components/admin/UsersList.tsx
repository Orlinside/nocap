"use client";

import { useMemo, useState } from "react";
import { FaEnvelope, FaSearch, FaUser } from "react-icons/fa";

import { DeleteConfirmationUser } from "@/components/admin/DeleteConfirmationUser";

type AdminUser = {
  id: string;
  email: string | null;
  name: string | null;
};

type UsersListProps = {
  users: AdminUser[];
};

export const UsersList = ({ users }: UsersListProps) => {
  const [query, setQuery] = useState("");

  const normalizedQuery = query.trim().toLowerCase();

  const filteredUsers = useMemo(() => {
    if (!normalizedQuery) return users;

    return users.filter((user) => {
      const name = (user.name ?? "").toLowerCase();
      const email = (user.email ?? "").toLowerCase();

      return name.includes(normalizedQuery) || email.includes(normalizedQuery);
    });
  }, [users, normalizedQuery]);

  return (
    <div className="space-y-3">
      <div className="flex flex-col gap-3 rounded-lg border border-white/10 bg-black/30 p-3 backdrop-blur-sm sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-sm">
          <FaSearch className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[11px] text-white/45" />
          <input
            type="text"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Rechercher par nom ou email..."
            className="h-9 w-full border border-white/20 bg-black/35 pl-9 pr-3 text-xs text-white placeholder:text-white/45 focus:border-white/40 focus:outline-none"
          />
        </div>

        <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-white/55">
          {filteredUsers.length} resultat{filteredUsers.length > 1 ? "s" : ""}
        </p>
      </div>

      <div className="overflow-hidden rounded-xl border border-white/10 bg-black/25 backdrop-blur-sm">
        {filteredUsers.length === 0 ? (
          <div className="px-4 py-8 text-center">
            <p className="font-mono text-sm text-white/55">
              Aucun utilisateur correspondant.
            </p>
          </div>
        ) : (
          <ul className="divide-y divide-white/10">
            {filteredUsers.map((user) => (
              <li
                key={user.id}
                className="flex items-center justify-between gap-3 px-3 py-3 sm:px-4"
              >
                <div className="min-w-0 flex items-center gap-3">
                  <div className="rounded-md bg-gradient p-1.5">
                    <FaUser className="text-xs text-white" />
                  </div>

                  <div className="min-w-0">
                    <p className="renogare truncate text-sm uppercase tracking-[0.08em] text-white">
                      {user.name ?? "Utilisateur sans nom"}
                    </p>

                    <div className="mt-0.5 flex items-center gap-1.5 text-white/60">
                      <FaEnvelope className="shrink-0 text-[10px]" />
                      <span className="truncate font-mono text-[11px]">
                        {user.email ?? "Email non renseigne"}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex shrink-0 items-center gap-3">
                  <span className="hidden font-mono text-[10px] text-white/35 sm:inline">
                    ID: {user.id.slice(0, 8)}...
                  </span>
                  <DeleteConfirmationUser userId={user.id} />
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
