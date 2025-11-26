import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { gameInvitationService } from "../../../services/game/gameInvitationService";
import type { GameInvitationDto } from "../../../models/domain/game/gameInvitationDto";
import Spinner from "../../../shared/spinners/spinner";
import { useAudio } from "../../../contexts/AudioContext";
import { useInvitation } from "../../../contexts/invitationContex";
import { AppHeader } from "../../shared/appHeader";

export default function InvitationsInbox() {
  const navigate = useNavigate();
  const { playBackSound, playJoinCreateSound } = useAudio();
  const { checkInvitations } = useInvitation();

  const [invitations, setInvitations] = useState<GameInvitationDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [respondingTo, setRespondingTo] = useState<number | null>(null);

  useEffect(() => {
    fetchInvitations();
  }, []);

  const fetchInvitations = async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await gameInvitationService.getInvitations();
      setInvitations(data);
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Error al obtener invitaciones.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleAccept = async (invitationId: number) => {
    setRespondingTo(invitationId);
    setError(null);

    try {
      const response = await gameInvitationService.respondInvitation({
        invitationId,
        accept: true,
      });

      if (response.accepted && response.gameId) {
        playJoinCreateSound();
        
        await checkInvitations();
        
        navigate(`/multijugador/${response.gameId}`);
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Error al aceptar invitación.";
      setError(errorMessage);
      setRespondingTo(null);
    }
  };

  const handleReject = async (invitationId: number) => {
    setRespondingTo(invitationId);
    setError(null);

    try {
      await gameInvitationService.respondInvitation({
        invitationId,
        accept: false,
      });

     
      await fetchInvitations();
      await checkInvitations();
      setRespondingTo(null);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Error al rechazar invitación.";
      setError(errorMessage);
      setRespondingTo(null);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString("es-AR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="h-screen w-screen fondo-city flex flex-col items-center justify-start">
    <AppHeader />

      <div className="w-full max-w-5xl mx-auto bg-black/60 text-[#5df9f9] p-6 pb-2 rounded-lg shadow-lg overflow-auto custom-scrollbar">
        <h1 className="text-6xl text-[#00f0ff]  text-center mb-10 pb-5 drop-shadow-[0_0_10px_#00ffff]">
          Invitaciones de Juego
        </h1>

        <div className="text-center mb-4">
          <p className="text-cyan-400 text-lg">
            {invitations.length > 0
              ? `Tenés ${invitations.length} invitación${invitations.length > 1 ? "es" : ""} pendiente${invitations.length > 1 ? "s" : ""}`
              : "No tenés invitaciones pendientes"}
          </p>
        </div>

        {loading && (
          <div className="flex justify-center py-10">
            <Spinner />
          </div>
        )}

        {error && (
          <div className="text-red-400 p-4 text-center bg-red-500/10 border border-red-500 rounded mb-4">
            {error}
          </div>
        )}

        {!loading && !error && invitations.length === 0 && (
          <div className="text-gray-400 p-8 text-center text-xl">
            No tenés invitaciones pendientes.
            <br />
            Cuando un amigo te invite a jugar, aparecerá aquí.
          </div>
        )}

        {!loading && !error && invitations.length > 0 && (
          <div className="space-y-4 max-h-96 overflow-y-auto custom-scrollbar">
            {invitations.map((invitation) => (
              <div
                key={invitation.id}
                className="bg-black/70 border-2 border-cyan-400 rounded-lg p-4 flex justify-between items-center"
              >
                <div className="flex-1">
                  <h3 className="text-2xl text-[#f95ec8] font-bold mb-2">
                    {invitation.inviterPlayerName} te invitó a jugar
                  </h3>
                  <div className="text-white text-lg space-y-1">
                    <p>
                      <span className="text-cyan-400">Partida:</span> {invitation.gameName}
                    </p>
                    <p>
                      <span className="text-cyan-400">Dificultad:</span> {invitation.difficulty}
                    </p>
                    <p>
                      <span className="text-cyan-400">Objetivo:</span> {invitation.expectedResult}
                    </p>
                    <p className="text-sm text-gray-400">
                      Recibida: {formatDate(invitation.createdAt)}
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => handleAccept(invitation.id)}
                    disabled={respondingTo === invitation.id}
                    className="bg-green-500 text-white font-bold hover:bg-[#00cc00] px-6 py-2 border-white border-2 text-xl transition-all hover:drop-shadow-[0_0_10px_#00ff00] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {respondingTo === invitation.id ? "..." : "ACEPTAR"}
                  </button>

                  <button
                    onClick={() => handleReject(invitation.id)}
                    disabled={respondingTo === invitation.id}
                    className="bg-red-500 text-white font-bold hover:bg-[#cc0000] px-6 py-2 border-white border-2 text-xl transition-all hover:drop-shadow-[0_0_10px_#ff0000] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {respondingTo === invitation.id ? "..." : "RECHAZAR"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="flex justify-center mt-3 pt-2 border-t border-gray-700">
          <Link
            to="/menu"
            onClick={playBackSound}
            className="bg-[#00f0ff] text-black text-2xl border-2 border-white px-6 py-2
                       tracking-wider transition-all duration-300 
                       hover:bg-cyan-400 shadow-[0_0_10px_rgba(0,217,255,0.3)] 
                       hover:shadow-[0_0_20px_rgba(0,217,255,0.6)]"
            style={{ marginTop: "20px", marginBottom: "20px" }}
          >
           <i className="ri-arrow-left-line mr-2"></i> Volver

          </Link>
        </div>
      </div>
    </div>
  );
}
