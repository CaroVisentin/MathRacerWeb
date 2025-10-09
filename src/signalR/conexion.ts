import {HubConnectionBuilder, LogLevel} from "@microsoft/signalr";

export const connection = new HubConnectionBuilder()
    .withUrl("https://localhost:5001/hub")
    .configureLogging(LogLevel.Information)
    .withAutomaticReconnect()
    .build();

connection.start().then(() => console.log("Conectado al servidor de SignalR"))
    .catch(err => console.error("Error al conectar con el servidor de SignalR: ", err));

    export default connection;