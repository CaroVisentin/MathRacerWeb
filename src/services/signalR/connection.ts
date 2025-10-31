import { HubConnection, HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { signalRUrl } from "../network/signalR";
import { useEffect, useState } from "react";


export const useConnection = () => {
    const [conn, setConn] = useState<HubConnection | null>(null);
    const [errorConexion, setErrorConexion] = useState<string | null>(null);

    // Iniciar conexión 
    useEffect(() => {
        const newConnection = new HubConnectionBuilder()
            .withUrl(signalRUrl)
            .configureLogging(LogLevel.Information)
            .withAutomaticReconnect()
            .build();

        setConn(newConnection);

        newConnection.start()
            .then(() => {
                setErrorConexion(null);
            })
            .catch(() => {
                setErrorConexion("Error al iniciar la conexión con SignalR.");
            });
        return () => {
            newConnection.stop();
        };
    }, []);

    const invoke = async <T extends unknown[]>(method: string, ...args: T) => {
        if (!conn || conn.state !== "Connected" ){
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
