import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { signalRUrl } from "../network/signalR";

export const connection = new HubConnectionBuilder()
    .withUrl(signalRUrl)
    .configureLogging(LogLevel.Information)
    .withAutomaticReconnect()
    .build();

connection.start().then(() => console.log("Conectado al servidor de SignalR"))
    .catch((err) => {
        console.error("Error al conectar con el servidor de SignalR: ", err);

    });

export default connection;