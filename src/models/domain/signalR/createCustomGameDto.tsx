export interface CreateCustomGameRequestDto {
    gameName: string;
    isPrivate: boolean;
    password?: string;
    difficulty: "FACIL" | "MEDIO" | "DIFICIL";
    expectedResult: "MAYOR" | "MENOR";
}