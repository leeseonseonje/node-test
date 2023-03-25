export class Calculator {
  static readonly operators: Calculation[] = [
    { operator: 'plus', do: (x, y) => x + y },
    { operator: 'minus', do: (x, y) => x - y },
    { operator: 'multiply', do: (x, y) => x * y },
    { operator: 'divide', do: (x, y) => x / y },
  ];

  static find(operator: string) {
    return this.operators.filter((o) => o.operator === operator).pop();
  }
}

export interface Calculation {
  operator: string;
  do: (x: number, y: number) => number;
}

const test = (x: number, y: number) => x + y;

type testType = typeof test;

const test2: testType = (x: number, y: number) => {
  const number = test(x, y);
  return number + 10;
};

const coln = () => {
  const x = 10;

  console.log(x);
};
