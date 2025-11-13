export interface SignalRConnectionInfo {
    hubUrl: string;
    events: {
        findMatch: string;
        joinGame: string;
        sendAnswer: string;
        gameUpdate: string;
        error: string;
    };
    message: string;
}