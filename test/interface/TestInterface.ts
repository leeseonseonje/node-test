export interface TestInterface {
  test();
}


export class TestClass implements TestInterface {
  test() {
    console.log('dada');
  }
}