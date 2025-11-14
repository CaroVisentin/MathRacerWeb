import { HubConnection, HubConnectionBuilder, LogLevel, HubConnectionState } from "@microsoft/signalr";
import { signalRUrl } from "../network/signalR";
import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";


export const useConnection = () => {
    const [conn, setConn] = useState<HubConnection | null>(null);
    const [errorConexion, setErrorConexion] = useState<string | null>(null);

    // Iniciar conexión 
    useEffect(() => {
        const auth = getAuth();

        const newConnection = new HubConnectionBuilder()
            .withUrl(signalRUrl, {
                // Adjunta el token de Firebase a todas las conexiones (negotiate y websockets)
                accessTokenFactory: async () => {
                    const user = auth.currentUser;
                    if (user) {
                        return await user.getIdToken();
                    }
                    return ""; // sin token ⇒ el backend debe permitir público para ciertos métodos
                },
            })
            .configureLogging(LogLevel.Information)
            .withAutomaticReconnect()
            .build();

        setConn(newConnection);

        const start = async () => {
            try {
                await newConnection.start();
                setErrorConexion(null);
            } catch (err) {
                console.error("Error al iniciar SignalR:", err);
                setErrorConexion("Error al iniciar la conexión con SignalR.");
            }
        };

        // Reintentos básicos durante reconexiones automáticas
        newConnection.onreconnected(() => setErrorConexion(null));
        newConnection.onclose(() => {
            // El hook de reconexión automática intentará restablecer; si no, mostramos error
            setErrorConexion("Conexión con SignalR cerrada.");
        });

        void start();

        return () => {
            void newConnection.stop();
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
