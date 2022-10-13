import {EachTest} from './EachTest';
import e from 'express';

describe('it.each', () => {


  it.each([
    [new EachTest('1'), 2],
    [new EachTest('2'), 3],
    [new EachTest('3'), 4],
  ])('it.each', (each, number) => {
    if (each instanceof EachTest) {
      console.log(each);
      console.log(each.returnFunction());
      each.logFunction();
    }
  });
});