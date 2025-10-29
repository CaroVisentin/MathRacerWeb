export const operationNamesMap: Record<string, string> = {
    "+": "Suma",
    "-": "Resta",
    "*": "Multiplicación",
    "/": "División",
};

export function mapOperations(operations: string[]): string {
    const mapped = operations.map(op => operationNamesMap[op] || op);

    if (mapped.length === 0) return "";
    if (mapped.length === 1) return mapped[0];

    // Todos menos el último se separan con coma, el último con "y"
    return mapped.slice(0, -1).join(", ") + " y " + mapped[mapped.length - 1];
}