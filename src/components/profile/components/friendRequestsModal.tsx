import { useEffect, useState } from "react";
import type { Friend } from "../../../models/ui/friend";
import { friendshipService } from "../../../services/friendship/friendshipService";
import { usePlayer } from "../../../hooks/usePlayer";


interface FriendRequestsModalProps {
    show: boolean;
    onClose: () => void;
    requests: Friend[];
    onRequestsUpdated?: () => void;
}

export const FriendRequestsModal = ({
    show,
    onClose,
    requests,
    onRequestsUpdated,
}: FriendRequestsModalProps) => {
    const [localRequests, setLocalRequests] = useState<Friend[]>(requests);
    const { player } = usePlayer();
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setLocalRequests(requests);
    }, [requests]);

    const handleAccept = async (fromPlayerId: number) => {
        setError(null);
        if (!player?.id) return;
        try {
            const request = {
                fromPlayerId,
                toPlayerId: player.id,
            };
            await friendshipService.acceptFriendRequest(request);
            setLocalRequests((prev) => prev.filter((r) => r.id !== fromPlayerId));
            onRequestsUpdated?.();
        } catch (err) {
            const errorMessage =
                err instanceof Error
                    ? err.message
                    : 'Ocurrió un error al aceptar la solicitud.';
            setError(errorMessage);
        }
    };

    const handleReject = async (fromPlayerId: number) => {
        setError(null);
        if (!player?.id) return;
        try {
            const request = {
                fromPlayerId,
                toPlayerId: player.id,
            };
            await friendshipService.rejectFriendRequest(request);
            setLocalRequests((prev) => prev.filter((r) => r.id !== fromPlayerId));
            onRequestsUpdated?.();
        } catch (err) {
            const errorMessage =
                err instanceof Error
                    ? err.message
                    : 'Ocurrió un error al rechazar la solicitud.';
            setError(errorMessage);
        }
    };

    const handleCloseModal = () => {
        setError(null);
        onClose();
    };

    if (!show) return null;

    return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
            <div className="bg-gray-900 text-white p-6 rounded shadow-lg w-[90%] max-h-120 max-w-xl">
                <h2 className="text-2xl pb-4 text-center">Solicitudes de amistad</h2>

                {error && (
                    <div
                      className="mt-4 bg-red-500/20 border border-red-500 text-red-400 px-4 py-2 rounded text-center">{error}
                    </div>
                )}

                {localRequests.length === 0 ? (

                    <div className="text-gray-400 p-4 text-center">No hay solicitudes pendientes.</div>
                ) : (
                    <div className="flex flex-col gap-3 mt-4 max-h-80 overflow-y-auto custom-scrollbar pt-2">
                        {localRequests.map((req) => (
                            <div
                                key={req.id}
                                className="flex items-center justify-between gap-3 bg-gray-800 p-3 rounded"
                            >
                                <div className="flex justify-between items-center gap-6">
                                    <div className="flex items-center gap-3">
                                        <span>
                                            <img
                                                src={req.avatarUrl}
                                                alt={req.name}
                                                className="w-10 h-10 rounded-full object-cover"
                                            />
                                        </span>
                                        <span className="text-white">{req.name}</span>
                                    </div>
                                    <span className="text-gray-400">{req.email}</span>
                                </div>

                                <div className="flex gap-2">
                                    <button
                                        onClick={() => handleAccept(req.id)}
                                        className="bg-[#00f0ff] text-slate-950 border-2 border-white px-3 py-1
                    tracking-wider transition-all duration-300 
                    hover:bg-cyan-400 shadow-[0_0_10px_rgba(0,217,255,0.3)] 
                    hover:shadow-[0_0_10px_rgba(0,217,255,0.6)]"
                                    >
                                        Aceptar
                                    </button>

                                    <button
                                        onClick={() => handleReject(req.id)}
                                        className="bg-red-500 text-white border-2 border-white px-3 py-1
                    tracking-wider transition-all duration-300 
                    hover:bg-red-400 shadow-[0_0_10px_rgba(249,94,200,0.3)] 
                     hover:shadow-[0_0_5px_rgba(255,255,255,0.6)]"
                                    >
                                        Rechazar
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                <button
                    onClick={handleCloseModal}
                    className="pt-4 text-red-500 hover:text-red-600 text-center w-full"
                >
                    Cerrar
                </button>
            </div>
        </div>
    );
};
