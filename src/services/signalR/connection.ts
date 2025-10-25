import { HubConnection, HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { signalRUrl } from "../network/signalR";
import { useEffect, useState } from "react";



// Función para construir la conexión a SignalR
// export const buildConnection = (): HubConnection => {
//     return new HubConnectionBuilder()
//         .withUrl(signalRUrl)
//         .configureLogging(LogLevel.Information)
//         .withAutomaticReconnect()
//         .build();
// };

export const useConnection = () => {
    const [conn, setConn] = useState<HubConnection | null>(null);
    const [errorConexion, setErrorConexion] = useState<string | null>(null);

    // Iniciar conexión al montar
    useEffect(() => {
        const newConnection = new HubConnectionBuilder()
            .withUrl(signalRUrl)
            .configureLogging(LogLevel.Information)
            .withAutomaticReconnect()
            .build();

        setConn(newConnection);

        newConnection.start()
            .then(() => {
                console.log("Conectado al servidor de SignalR");
                setErrorConexion(null);
            })
            .catch((err) => {
                setErrorConexion("Error al iniciar la conexión con SignalR.");
                console.error("Error al conectar con el servidor de SignalR: ", err);
            });
        return () => {
            console.log("Desconectando la conexión de SignalR.");
            newConnection.stop();
        };
    }, []);

    const invoke = async <T extends unknown[]>(method: string, ...args: T) => {
        if (!conn) return;

        try {
            await conn.invoke(method, ...args);
        } catch (err: unknown) {
            if (err instanceof Error) {
                console.error(`Error al invocar ${method}:`, err.message);
            } else {
                console.error(`Error al invocar ${method}:`, err);
            }
        }
    };

    const on = <T extends unknown[]>(event: string, callback: (...args: T) => void) => {
        conn?.on(event, callback);
    };

    const off = <T extends unknown[]>(event: string, callback: (...args: T) => void) => {
        conn?.off(event, callback);
    };

    return { conn, errorConexion, invoke, on, off };
};
