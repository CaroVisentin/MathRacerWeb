import { useState } from "react";
import { friendshipService } from "../../../services/friendship/friendshipService";
import { profileService } from "../../../services/profile/profileService";
import { friendMapper } from "../../../models/mappers/friendMapper";
import type { Friend } from "../../../models/ui/friend";


interface AddFriendModalProps {
    show: boolean;
    onClose: () => void;
    fromPlayerId: number;
}

export const AddFriendModal = ({ show, onClose, fromPlayerId }: AddFriendModalProps) => {
    const [searchEmail, setSearchEmail] = useState("");
    const [foundPlayer, setFoundPlayer] = useState<Friend | null>(null);
    const [loading, setLoading] = useState(false);
    const [sendingRequest, setSendingRequest] = useState(false);

    if (!show) return null;

    const handleSearch = async () => {
        if (!searchEmail) return;
        setLoading(true);
        setFoundPlayer(null);

        try {
            const profile = await profileService.getProfileByEmail(searchEmail);
            //mapear profile a Friend ui model
            const friend = friendMapper.fromPlayerProfileDto(profile);
            setFoundPlayer(friend);
        } catch (err: unknown) {
            const error = err as Error;
            alert(error.message || "Jugador no encontrado");
        } finally {
            setLoading(false);
        }
    };

    const handleSendRequest = async () => {
        if (!foundPlayer) return;

        setSendingRequest(true);
        try {
            await friendshipService.sendFriendRequest({
                fromPlayerId,
                toPlayerId: foundPlayer.id,
            });
            alert("Solicitud enviada correctamente");
            onClose();
            setFoundPlayer(null);
            setSearchEmail("");
        } catch (err: unknown) {
            const error = err as Error;
            alert(error.message || "Error al enviar solicitud");
        } finally {
            setSendingRequest(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
            <div className="bg-gray-900 p-6 rounded w-96 flex flex-col gap-4">
                <h2 className="text-white text-center text-xl">Buscar amigo por e-mail</h2>

                <input
                    type="email"
                    placeholder="Email de tu amigo"
                    value={searchEmail}
                    onChange={(e) => setSearchEmail(e.target.value)}
                    className="p-2 rounded w-full bg-gray-800 text-white border border-gray-700"
                />

                <button
                    onClick={handleSearch}
                    className="bg-[#00f0ff] text-slate-950 border-2 border-white px-8 py-2
                 text-xl tracking-wider transition-all duration-300 
                 hover:bg-cyan-400 shadow-[0_0_10px_rgba(0,217,255,0.3)] 
                 hover:shadow-[0_0_20px_rgba(0,217,255,0.6)]
                 disabled:opacity-50"
                    disabled={loading}
                >
                    {loading ? "Buscando..." : "Buscar"}
                </button>

                {foundPlayer && (
                    <div className="flex items-center justify-between gap-3 bg-gray-800 p-2 rounded mt-2">
                        <span className="flex items-center gap-3">
                            <img
                                src={foundPlayer.avatarUrl}
                                alt={foundPlayer.name}
                                className="w-10 h-10 rounded-full object-cover"
                            />
                            <span className="text-white">{foundPlayer.name}</span>
                        </span>
                        <button
                            onClick={handleSendRequest}
                            disabled={sendingRequest}
                            className="bg-[#00f0ff] border-2 border-white px-3 py-1
                tracking-wider transition-all duration-300 
                 hover:bg-cyan-400 shadow-[0_0_10px_rgba(0,217,255,0.3)] 
                 hover:shadow-[0_0_20px_rgba(0,217,255,0.6)]
                 disabled:opacity-50"
                        >
                            {sendingRequest ? "Enviando..." : "Enviar Solicitud"}
                        </button>
                    </div>
                )}

                <button
                    onClick={() => {
                        onClose();
                        setFoundPlayer(null);
                        setSearchEmail("");
                    }}
                    className="mt-4 text-red-500 hover:text-red-600"
                >
                    Cerrar
                </button>
            </div>
        </div>
    );
};
