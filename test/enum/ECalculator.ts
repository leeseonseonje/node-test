import { Enum, EnumType } from 'ts-jenum';

@Enum('operator')
export class ECalculator extends EnumType<ECalculator>() {
  static readonly PLUS = new ECalculator('PLUS', (x, y) => x + y);
  static readonly MINUS = new ECalculator('MINUS', (x, y) => x - y);
  static readonly MULTIPLY = new ECalculator('MULTIPLY', (x, y) => x * y);
  static readonly DIVIDE = new ECalculator('DIVIDE', (x, y) => x / y);

  private constructor(
    readonly operator: string,
    readonly calculation: (x: number, y: number) => number,
  ) {
    super();
  }

  static calc(operator: string, x: number, y: number) {
    return ECalculator.values()
      .filter((e) => e.operator === operator)
      .pop()
      .calculation(x, y);
  }
}
