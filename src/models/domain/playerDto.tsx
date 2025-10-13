export interface PlayerDto {
    id: number;
    name: string;
    correctAnswers: number;
    indexAnswered: number;
    position: number;
    isReady: boolean;
    connectionId: string;
    
}