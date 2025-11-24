import type { Friend } from "../../../models/ui/profile/friends/friend";

interface FriendRequestsListProps {
  requests: Friend[];
  onAccept: (fromPlayerId: number) => void;
  onReject: (fromPlayerId: number) => void;
  className?: string;
}

export const FriendRequestsList = ({
  requests,
  onAccept,
  onReject,
  className = "",
}: FriendRequestsListProps) => {
  if (requests.length === 0) {
    return null;
  }

  return (
    <div
      className={`${className}`}
    >
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-white text-3xl py-4">Solicitudes pendientes</h3>
    
      </div>

      <div className="flex flex-col gap-3 max-h-64 overflow-y-auto custom-scrollbar pr-1">
        {requests.map((req) => (
          <div
            key={req.id}
            className="flex items-center justify-between gap-4 bg-[#1a0a2e] border-2  border-cyan-400 rounded p-3"
          >
            <div className="flex items-center gap-3">
              <img
                src={req.avatarUrl}
                alt={req.name}
                className="w-12 h-12  object-cover "
              />
              <div>
                <p className="text-white text-lg font-bold">{req.name}</p>
                <p className="text-gray-400 text-sm">{req.email}</p>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => onAccept(req.id)}
                className="bg-[#00f0ff] text-slate-950 border-2 border-white px-4 py-1 text-sm font-bold tracking-widest transition-all duration-300 hover:bg-cyan-300"
              >
                ACEPTAR
              </button>
              <button
                onClick={() => onReject(req.id)}
                className="bg-transparent text-red-400 border-2 border-red-400 px-4 py-1 text-sm font-bold tracking-widest transition-all duration-300 hover:bg-red-500/20"
              >
                RECHAZAR
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
