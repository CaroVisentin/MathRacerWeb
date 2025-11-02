import { useState, useEffect, useCallback } from "react";
import { FriendList } from "../components/friendsList";
import { usePlayer } from "../../../hooks/usePlayer";
import type { FriendDto } from "../../../models/domain/friendDto";
import type { Friend } from "../../../models/ui/friend";
import { friendshipService } from "../../../services/friendship/friendshipService";
import { friendMapper } from "../../../models/mappers/friendMapper";
import { AddFriendModal } from "../components/addFriendModal";



export const AmigosSection = () => {
    const { player } = usePlayer();
    const [friends, setFriends] = useState<Friend[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [showModal, setShowModal] = useState(false);


    const fetchFriends = useCallback(async () => {
        if (!player?.id) return;
        setLoading(true);
        setError(null);

        try {
            const data: FriendDto[] = await friendshipService.getFriends(player.id);
            console.log("Friends data fetched:", data);
            const mappedFriends = friendMapper.fromDtoList(data);
            setFriends(mappedFriends);
        } catch (err: unknown) {
            console.error("Error fetching friends:", err);
            setError((err as Error)?.message ?? "No se pudo cargar la lista de amigos");
        } finally {
            setLoading(false);
        }
    }, [player]);

    useEffect(() => {
        fetchFriends();
    }, [fetchFriends]);

    const handleRemove = (id: number) => {
        setFriends((prev) => prev.filter((f) => f.id !== id));
    };



    return (
        <div className="w-full h-full flex flex-col items-center gap-6 bg-black py-6">
            <span className="text-white text-xl">Lista de amigos</span>

            <div className="w-full">
                {loading && <div className="text-white p-4">Cargando amigos...</div>}
                {error && <div className="text-red-400 p-4">Error: {error}</div>}
                {!loading && !error && (
                    <FriendList friends={friends} onRemove={handleRemove} />
                )}
            </div>

            <div>
                <button
                    onClick={() => setShowModal(true)}
                    className="bg-[#00f0ff] text-slate-950 border-2 border-white px-8 py-2
                text-xl tracking-wider transition-all duration-300 
                hover:bg-cyan-400 shadow-[0_0_10px_rgba(0,217,255,0.3)] 
                hover:shadow-[0_0_20px_rgba(0,217,255,0.6)]
                mt-4"
                >
                    AGREGAR AMIGO
                </button>

                {/* Modal */}
                {player && (
                    <AddFriendModal
                        show={showModal}
                        onClose={() => setShowModal(false)}
                        fromPlayerId={player.id}
                    />
                )}
            </div>
        </div>
    );
};