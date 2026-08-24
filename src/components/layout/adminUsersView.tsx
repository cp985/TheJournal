

"use client";

import { useLanguage } from "@/context/maincontext";
import { formatDate } from "@/lib/utils";
import DeleteUserButton from "./adminDeleteUserButton";
import ToggleRoleButton from "./adminRoleButton";
import { DbUser } from "@/lib/type";


interface AdminUsersViewProps {
  q: string;
  usersList: DbUser[];
}

export default function AdminUsersView({ q, usersList }: AdminUsersViewProps) {
  const { t } = useLanguage();
  const safeUsersList = Array.isArray(usersList) ? usersList : [];

  const filteredUsers = safeUsersList.filter((user) => {
    const username = user.username ? user.username.toLowerCase() : "";
    const email = user.email ? user.email.toLowerCase() : "";
    const query = q.toLowerCase();

    return username.includes(query) || email.includes(query);
  });

  return (
    <div className="space-y-6 font-mono">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-zinc-100">
          {t.admin.usersView.title}
        </h1>
        <span className="text-xs text-zinc-400">
          {safeUsersList.length} {t.admin.usersView.registeredCount}
        </span>
      </div>

      {/* Vista Card: attiva fino a screen grandi (lg) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:hidden gap-3">
        {filteredUsers.map((user) => (
          <div
            key={user.id}
            className="p-4 rounded-xl border border-zinc-800 bg-zinc-900/40 space-y-3"
          >
            <div className="flex justify-between items-center">
              <span className="font-bold text-zinc-100">{user.username}</span>
              <span
                className={`px-2 py-0.5 rounded text-[10px] ${
                  user.role === "ADMIN"
                    ? "bg-rose-500/10 text-amber-400 border border-rose-500/30"
                    : "bg-zinc-800 text-zinc-300"
                }`}
              >
                {user.role}
              </span>
            </div>
            <p className="text-xs text-zinc-400">{user.email}</p>
            <div className="flex justify-between items-center pt-2 border-t border-zinc-800/80">
              <span className="text-[10px] text-zinc-500">
                {t.admin.usersView.createdOn} {formatDate(user.createdAt)}
              </span>
              <div className="space-x-2">
                <ToggleRoleButton userId={user.id} />
                <DeleteUserButton userId={user.id} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Vista Tabella: visibile solo da lg in poi */}
      <div className="hidden lg:block overflow-x-auto rounded-xl border border-zinc-800 bg-zinc-900/30">
        <table className="w-full text-left text-xs">
          <thead className="border-b border-zinc-800 bg-zinc-900/80 text-zinc-400">
            <tr>
              <th className="p-3">{t.admin.usersView.tableUsername}</th>
              <th className="p-3">{t.admin.usersView.tableEmail}</th>
              <th className="p-3">{t.admin.usersView.tableRole}</th>
              <th className="p-3">{t.admin.usersView.tableCreatedAt}</th>
              <th className="p-3 text-right">
                {t.admin.usersView.tableActions}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800/60 text-zinc-200">
            {filteredUsers.map((user) => (
              <tr
                key={user.id}
                className="hover:bg-zinc-900/40 transition-colors"
              >
                <td className="p-3 font-semibold">{user.username}</td>
                <td className="p-3 text-zinc-400">{user.email}</td>
                <td className="p-3">
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] ${
                      user.role === "ADMIN"
                        ? "bg-rose-500/10 text-rose-400 border border-rose-500/30"
                        : "bg-zinc-800 text-zinc-300"
                    }`}
                  >
                    {user.role}
                  </span>
                </td>
                <td className="p-3 text-zinc-400">
                  {formatDate(user.createdAt)}
                </td>
                <td className="p-3 text-right space-x-2 flex items-center justify-end">
                  <ToggleRoleButton userId={user.id} />
                  <DeleteUserButton userId={user.id} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}