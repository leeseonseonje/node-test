import { Calculator } from './Calculator';
import { ECalculator } from './ECalculator';

describe('enumTest', () => {
  it('calculator', async () => {
    expect(Calculator.find('plus').do(5, 5)).toBe(10);
    expect(Calculator.find('minus').do(5, 5)).toBe(0);
    expect(Calculator.find('multiply').do(5, 5)).toBe(25);
    expect(Calculator.find('divide').do(5, 5)).toBe(1);
  });

  it('Ecalculation', async () => {
    console.log('EC');

    expect(ECalculator.PLUS.calculation(5, 5)).toBe(10);
    expect(ECalculator.MINUS.calculation(5, 5)).toBe(0);
    expect(ECalculator.MULTIPLY.calculation(5, 5)).toBe(25);
    expect(ECalculator.DIVIDE.calculation(5, 5)).toBe(1);
  });

  it('Ecalc', async () => {
    expect(ECalculator.calc('PLUS', 5, 5)).toBe(10);
    expect(ECalculator.calc('MINUS', 5, 5)).toBe(0);
    expect(ECalculator.calc('MULTIPLY', 5, 5)).toBe(25);
    expect(ECalculator.calc('DIVIDE', 5, 5)).toBe(1);
  });
});
