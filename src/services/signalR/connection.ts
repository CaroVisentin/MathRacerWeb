import { HubConnection, HubConnectionBuilder, LogLevel, HubConnectionState } from "@microsoft/signalr";
import { signalRUrl } from "../network/signalR";
import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";


export const useConnection = () => {
    const [conn, setConn] = useState<HubConnection | null>(null);
    const [errorConexion, setErrorConexion] = useState<string | null>(null);

    // Iniciar conexión 
    useEffect(() => {
        const auth = getAuth();

        let activeConnection: HubConnection | null = null;

        const buildAndStart = async () => {
            const newConnection = new HubConnectionBuilder()
                .withUrl(signalRUrl, {
                    accessTokenFactory: async () => {
                        const user = auth.currentUser;
                        if (user) {
                            // token fresco para asegurar validez en el hub
                            return await user.getIdToken(true);
                        }
                        return "";
                    },
                })
                .configureLogging(LogLevel.Information)
                .withAutomaticReconnect()
                .build();

            setConn(newConnection);
            activeConnection = newConnection;

            try {
                await newConnection.start();
                setErrorConexion(null);
            } catch (err) {
                console.error("Error al iniciar SignalR:", err);
                setErrorConexion("Error al iniciar la conexión con SignalR.");
            }

            newConnection.onreconnected(() => setErrorConexion(null));
            newConnection.onclose(() => setErrorConexion("Conexión con SignalR cerrada."));
        };

        // Iniciar la conexión cuando haya usuario autenticado
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            if (firebaseUser) {
                // Si hay una conexión previa sin token, detenerla y reconstruir
                if (activeConnection) {
                    try { await activeConnection.stop(); } catch { /* ignore */ }
                    activeConnection = null;
                }
                await buildAndStart();
            } else {
                // Sin usuario ⇒ detener conexión si existiera
                if (activeConnection) {
                    try { await activeConnection.stop(); } catch { /* ignore */ }
                    activeConnection = null;
                }
                setConn(null);
            }
        });

        return () => {
            unsubscribe();
            if (activeConnection) {
                void activeConnection.stop();
            }
        };
    }, []);

    const invoke = async <T extends unknown[]>(method: string, ...args: T) => {
        if (!conn || conn.state !== HubConnectionState.Connected) {
            throw new Error("No hay conexión activa con el servidor.");
        }

        return conn.invoke(method, ...args);
    };

    const on = <T extends unknown[]>(event: string, callback: (...args: T) => void) => {
        conn?.on(event, callback);
    };

    const off = <T extends unknown[]>(event: string, callback: (...args: T) => void) => {
        conn?.off(event, callback);
    };

    return { conn, errorConexion, invoke, on, off };
};
