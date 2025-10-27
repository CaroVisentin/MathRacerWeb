"use client"

import type React from "react"

import { useState } from "react"
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import isologo from "/images/mathi_racer_logo.png";
import fondo from "../../assets/images/fhome.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../services/firebase/authServise";

export const LoginPage = () => {
    const [showPassword, setShowPassword] = useState(false)
    //const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
       // console.log("Login attempt:", { username, password })

       try {
        // Llamar al servicio de login (a implementar)
        const user = await loginUser(email, password);
         console.log("Usuario logueado:", user.uid);
        // Redirigir o mostrar mensaje de éxito
        navigate("/"); // Ejemplo de redirección
       } catch (error) {
        console.error("Error al loguear el usuario:", error);
        alert("Error al loguear el usuario: " + (error as Error).message);
       };
    }

    return (
        <div className="min-h-screen relative flex items-center justify-center overflow-hidden">
            {/* Fondo */}
            <div className="absolute inset-0 z-0">
                <img src={fondo} alt="Fondo" className="object-cover w-full h-full" />
                <div className="absolute inset-0 bg-black/40" />
            </div>

            {/* Formulario */}
            <div className="relative z-10 w-full max-w-md px-6">
                {/* Logo con bloque detrás */}
                <div className="!mb-6 flex justify-center">
                    <div className="bg-black/50 px-6 py-3 rounded-lg drop-shadow-lg">
                        <img
                            src={isologo}
                            alt="Math Racer Logo"
                            className="w-60 h-auto drop-shadow-[0_0_10px_#00ffff]"
                        />
                    </div>
                </div>

                {/* Formulario con spacing entre grupos */}
                <form onSubmit={handleSubmit} className="flex flex-col !space-y-8">

                    {/* Inputs */}
                    <div className="flex flex-col !space-y-6">
                        <div>
                            <input
                                id="email"
                                type="text"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-3 bg-[#04121E] border-2 border-cyan-400 
                                text-white placeholder-[#00FCFC] focus:outline-none focus:ring-2 focus:ring-cyan-400 
                                focus:border-transparent transition-all"
                                placeholder="Email"
                            />
                        </div>

                        <div>
                            <div className="relative">
                                <input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full px-4 py-3 bg-[#04121E] border-2 border-cyan-400 text-white placeholder-[#00FCFC] 
                                    focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all pr-12"
                                    placeholder="Contraseña"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-cyan-400 hover:text-cyan-300 transition-colors"
                                >
                                    {showPassword ? (
                                        <FontAwesomeIcon icon={faEyeSlash} className="w-5 h-5" />
                                    ) : (
                                        <FontAwesomeIcon icon={faEye} className="w-5 h-5" />
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Botones */}
                    <div className="flex flex-col !space-y-4">
                        <button
                            type="submit"
                            className="w-full py-2 bg-cyan-400 hover:bg-cyan-300 text-black 
                            transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-cyan-400/50
                            text-lg"
                        >
                            Iniciar sesión
                        </button>

                        <button
                            type="button"
                            className="w-full py-2 bg-white hover:bg-gray-100 text-gray-800 transition-all flex items-center justify-center !gap-3 shadow-lg
                            text-lg"
                        >
                            <svg className="w-5 h-5" viewBox="0 0 24 24">
                                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                            </svg>
                            Continuar con Google
                        </button>
                    </div>
                </form>

                {/* Registro */}
                <p className="!mt-5 text-center text-white text-lg">
                    ¿No tenés cuenta?{" "}
                    <Link to="/register"
                        className="text-[#FFE50C] hover:text-orange-300 transition-colors"
                    >
                        Registrate acá
                    </Link>
                </p>
            </div>
        </div>
    )
}
