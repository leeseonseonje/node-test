import {Calculator} from "./Operator";
import {ECalculator} from "./ECalculator";

describe('ts-jenumTest', () => {

    it('calculator', async () => {
        expect(Calculator.find('plus').calculation(5, 5)).toBe(10);
        expect(Calculator.find('minus').calculation(5, 5)).toBe(0);
        expect(Calculator.find('multiply').calculation(5, 5)).toBe(25);
        expect(Calculator.find('divide').calculation(5, 5)).toBe(1);
    });

    it('ts-jenum Test', async () => {
        expect(ECalculator.PLUS.calculator(5, 5)).toBe(10);
        expect(ECalculator.MINUS.calculator(5, 5)).toBe(0);
        expect(ECalculator.MULTIPLY.calculator(5, 5)).toBe(25);
        expect(ECalculator.DIVIDE.calculator(5, 5)).toBe(1);
    });

    it('ts-jenum Test', async () => {
        expect(ECalculator.PLUS.calc('PLUS', 5, 5)).toBe(10);
        expect(ECalculator.MINUS.calc('MINUS', 5, 5)).toBe(0);
        expect(ECalculator.MULTIPLY.calc('MULTIPLY', 5, 5)).toBe(25);
        expect(ECalculator.DIVIDE.calc('DIVIDE', 5, 5)).toBe(1);
    });
});