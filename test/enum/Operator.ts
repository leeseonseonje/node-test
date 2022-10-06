export class Calculator  {

    static readonly operators: Operations[] = [
        { operator: 'plus', calculation: (x, y) => x + y },
        { operator: 'minus', calculation: (x, y) => x - y },
        { operator: 'multiply', calculation: (x, y) => x * y },
        { operator: 'divide', calculation: (x, y) => x / y },
    ]

    static find(operator: string) {
        return this.operators.filter(o => o.operator === operator).pop();
    }
}

export interface Operations {
    operator: string;
    calculation: (x: number, y: number) => number;
}