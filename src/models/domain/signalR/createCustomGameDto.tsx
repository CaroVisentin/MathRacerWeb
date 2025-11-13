export interface CreateCustomGameRequestDto {
    gameName: string;
    isPrivate: boolean;
    password?: string;
    difficulty: "Facil" | "Medio" | "Dificil";
    expectedResult: "Mayor" | "Menor";
}