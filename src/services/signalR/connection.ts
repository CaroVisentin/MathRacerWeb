import { HubConnection, HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { signalRUrl } from "../network/signalR";



// Función para construir la conexión a SignalR
export const buildConnection = (): HubConnection => {
    return new HubConnectionBuilder()
        .withUrl(signalRUrl)
        .configureLogging(LogLevel.Information)
        .withAutomaticReconnect()
        .build();
};
