import {Calculator} from "./Operator";

describe('ts-jenumTest', () => {

    it('calculator', async () => {
        expect(Calculator.find('plus').calculation(5, 5)).toBe(10);
        expect(Calculator.find('minus').calculation(5, 5)).toBe(0);
        expect(Calculator.find('multiply').calculation(5, 5)).toBe(25);
        expect(Calculator.find('divide').calculation(5, 5)).toBe(1);
    });
});