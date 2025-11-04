import { useState, useEffect, useCallback } from "react";
import { FriendList } from "../components/friendsList";
import { usePlayer } from "../../../hooks/usePlayer";
import type { FriendDto } from "../../../models/domain/friendDto";
import type { Friend } from "../../../models/ui/friend";
import { friendshipService } from "../../../services/friendship/friendshipService";
import { friendMapper } from "../../../models/mappers/friendMapper";
import { AddFriendModal } from "../components/addFriendModal";
import Spinner from "../../../shared/spinners/spinner";
import { FriendRequestsModal } from "../components/friendRequestsModal";
import { manageError } from "../../../shared/utils/manageErrors";
import { ConfirmModal } from "../components/confirmDeleteFriendModal";




export const AmigosSection = () => {
    const { player } = usePlayer();
    const [friends, setFriends] = useState<Friend[]>([]);
    const [pendingRequests, setPendingRequests] = useState<Friend[]>([]);
    const [pendingCount, setPendingCount] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [showRequestsModal, setShowRequestsModal] = useState(false);

    const [friendToDelete, setFriendToDelete] = useState<Friend | null>(null);
    const [showConfirmModal, setShowConfirmModal] = useState(false);

    const fetchFriends = useCallback(async () => {
        if (!player?.id) return;
        setLoading(true);
        setError(null);

        try {
            const data: FriendDto[] = await friendshipService.getFriends(player.id);
            const mappedFriends = friendMapper.fromDtoList(data);
            setFriends(mappedFriends);
        } catch (err) {
            manageError(err);
        } finally {
            setLoading(false);
        }
    }, [player]);

    const fetchPendingRequests = useCallback(async () => {
        if (!player?.id) return;
        try {
            const data: FriendDto[] = await friendshipService.getFriendRequests(player.id);
            const mappedRequests = friendMapper.fromDtoList(data);
            setPendingRequests(mappedRequests);
            setPendingCount(mappedRequests.length);
        } catch (err) {
            manageError(err);
        }
    }, [player]);

    useEffect(() => {
        fetchFriends();
        fetchPendingRequests();
    }, [fetchFriends, fetchPendingRequests]);

    const handleRemove = (friend: Friend) => {
        setFriendToDelete(friend);
        setShowConfirmModal(true);
    };



    const confirmDelete = async () => {
        if (!player || !friendToDelete) return;
        try {
            const dto = { fromPlayerId: player.id, toPlayerId: friendToDelete.id };
            await friendshipService.deleteFriend(dto);
            setShowConfirmModal(false);
            setFriendToDelete(null);
            await fetchFriends();
        } catch (err) {
            manageError(err);
        }
    };

    return (
        <div className="flex flex-col items-center w-full h-full bg-black">
            <div className="w-full max-w-2xl flex flex-col h-[calc(100vh-180px)]">

                <div className="sticky top-0 z-40 bg-black flex flex-col items-center gap-4 py-4">
                    <span className="text-white text-3xl">Lista de amigos</span>

                    <div className="w-full flex justify-between items-center">
                        <button
                            onClick={() => setShowModal(true)}
                            className="bg-[#00f0ff] text-slate-950 border-2 border-white px-8 py-2
                                text-xl tracking-wider transition-all duration-300 
                                hover:bg-cyan-400 shadow-[0_0_10px_rgba(0,217,255,0.3)] 
                                hover:shadow-[0_0_20px_rgba(0,217,255,0.6)]"
                        >
                            AGREGAR AMIGO
                        </button>

                        <button
                            onClick={() => setShowRequestsModal(true)}
                            className="relative bg-[#f95ec8] text-white border-2 border-white px-4 py-2
                            text-xl tracking-wider transition-all duration-300 
                            hover:bg-pink-500 shadow-[0_0_10px_rgba(249,94,200,0.3)] 
                            hover:shadow-[0_0_20px_rgba(249,94,200,0.6)]"
                        >
                            <i className="ri-inbox-2-fill text-2xl"></i>

                            {pendingCount > 0 && (
                                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-sm rounded-full w-5 h-5 flex items-center justify-center">
                                    {pendingCount}
                                </span>
                            )}
                        </button>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto custom-scrollbar">
                    {loading && <Spinner />}
                    {error && <div className="text-red-400 p-4">Error: {error}</div>}

                    {!loading && !error && (
                        friends.length > 0 ? (
                            <FriendList friends={friends} onRemove={handleRemove} />
                        ) : (
                            <div className="text-gray-400 p-8 text-center text-3xl">
                                Aún no agregaste a nadie a tu lista de amigos
                                <br />¡Envía una solicitud!
                            </div>
                        )
                    )}
                </div>

            </div>

            {player && (
                <>
                    <AddFriendModal
                        show={showModal}
                        onClose={() => setShowModal(false)}
                        fromPlayerId={player.id}
                    />
                    <FriendRequestsModal
                        show={showRequestsModal}
                        onClose={() => setShowRequestsModal(false)}
                        requests={pendingRequests}
                        onRequestsUpdated={() => {
                            fetchFriends();
                            fetchPendingRequests();
                        }}

                    />

                    <ConfirmModal
                        show={showConfirmModal}
                        message={`¿Estás seguro de eliminar a ${friendToDelete?.name || "este amigo"} de tu lista de amigos?`}
                        onConfirm={confirmDelete}
                        onCancel={() => setShowConfirmModal(false)}
                    />
                </>
            )}
        </div>
    );
};

