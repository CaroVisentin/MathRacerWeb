import {HubConnectionBuilder, LogLevel} from "@microsoft/signalr";

export const connection = new HubConnectionBuilder()
    .withUrl("http://localhost:5153/gamehub")
    .configureLogging(LogLevel.Information)
    .withAutomaticReconnect()
    .build();

connection.start().then(() => console.log("Conectado al servidor de SignalR"))
    .catch(err => console.error("Error al conectar con el servidor de SignalR: ", err));

    export default connection;