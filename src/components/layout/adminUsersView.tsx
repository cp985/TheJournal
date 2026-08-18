

import { MOCK_USERS } from "@/app/mockAdmin";
import { FiTrash2, FiUserCheck } from "react-icons/fi";

export default function AdminUsersView({q}: {q: string}) {

const filteredUsers = MOCK_USERS.filter((user) => 
  user.username.toLowerCase().includes(q.toLowerCase()) || user.email.toLowerCase().includes(q.toLowerCase())
);

  return (
    <div className="space-y-6 font-mono">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-zinc-100">Gestione Utenti</h1>
        <span className="text-xs text-zinc-400">{MOCK_USERS.length} registrati</span>
      </div>

      {/* Vista Card: attiva fino a screen grandi (lg) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:hidden gap-3">
        {filteredUsers.map((user) => (
          <div key={user.id} className="p-4 rounded-xl border border-zinc-800 bg-zinc-900/40 space-y-3">
            <div className="flex justify-between items-center">
              <span className="font-bold text-zinc-100">{user.username}</span>
              <span className={`px-2 py-0.5 rounded text-[10px] ${user.role === 'ADMIN' ? 'bg-rose-500/10 text-rose-400 border border-rose-500/30' : 'bg-zinc-800 text-zinc-300'}`}>
                {user.role}
              </span>
            </div>
            <p className="text-xs text-zinc-400">{user.email}</p>
            <div className="flex justify-between items-center pt-2 border-t border-zinc-800/80">
              <span className="text-[10px] text-zinc-500">{user.createdAt}</span>
              <div className="space-x-2">
                <button className="p-1.5 rounded bg-zinc-800 text-zinc-300 hover:bg-zinc-700 cursor-pointer" title="Modifica ruolo">
                  <FiUserCheck className="w-3.5 h-3.5" />
                </button>
                <button className="p-1.5 rounded bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 cursor-pointer" title="Elimina">
                  <FiTrash2 className="w-3.5 h-3.5" />
                </button>
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
              <th className="p-3">Username</th>
              <th className="p-3">Email</th>
              <th className="p-3">Ruolo</th>
              <th className="p-3">Data Iscrizione</th>
              <th className="p-3 text-right">Azioni</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800/60 text-zinc-200">
            {MOCK_USERS.map((user) => (
              <tr key={user.id} className="hover:bg-zinc-900/40 transition-colors">
                <td className="p-3 font-semibold">{user.username}</td>
                <td className="p-3 text-zinc-400">{user.email}</td>
                <td className="p-3">
                  <span className={`px-2 py-0.5 rounded text-[10px] ${user.role === 'ADMIN' ? 'bg-rose-500/10 text-rose-400 border border-rose-500/30' : 'bg-zinc-800 text-zinc-300'}`}>
                    {user.role}
                  </span>
                </td>
                <td className="p-3 text-zinc-400">{user.createdAt}</td>
                <td className="p-3 text-right space-x-2">
                  <button className="p-1.5 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300 cursor-pointer" title="Modifica ruolo">
                    <FiUserCheck className="w-3.5 h-3.5" />
                  </button>
                  <button className="p-1.5 rounded bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 cursor-pointer" title="Elimina">
                    <FiTrash2 className="w-3.5 h-3.5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}