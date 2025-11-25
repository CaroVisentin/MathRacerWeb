import { Link } from "react-router-dom";
import mathiSad from "../../../assets/images/mathiTriste.png";

export default function PaymentFailure() {
  return (
    <div className="min-h-screen w-screen bg-[#060105] flex items-center justify-center relative overflow-hidden px-4 py-12">
      <div className="relative max-w-4xl w-full  via-[#1a020f]/90 to-black/80 border border-white/20 p-8 md:p-12 shadow-[0_0_40px_rgba(249,94,200,0.25)]">
        <div className="absolute -inset-1 via-[#ff6f91] to-[#f95ec8] blur-2xl opacity-30" />
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
          <div className="relative">
            <img
              src={mathiSad}
              alt="Mathi triste"
              className="w-48 md:w-56 drop-shadow-[0_0_35px_rgba(249,94,200,0.45)]"
            />
          </div>

          <div className="flex-1 text-center md:text-left space-y-6">
            <h1 className="text-white text-4xl md:text-5xl font-black leading-tight">
              Pago fallido
            </h1>
            <p className="text-gray-200 text-lg md:text-3xl">
              No pudimos procesar tu compra. Revisá los datos o probá nuevamente.
            </p>
            <div className="space-y-4">
              <Link
                to="/tienda"
                className="inline-flex items-center justify-center w-full md:w-auto bg-[#f95ec8] text-white border-2 border-white px-3 py-3 text-lg font-black tracking-[0.3em] transition-all duration-300 hover:bg-pink-400 hover:-translate-y-1 shadow-[0_0_20px_rgba(249,94,200,0.45)]"
              >
                INTENTAR DE NUEVO
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
