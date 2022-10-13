export class EachTest {

  private name: string;

  constructor(name: string) {
    this.name = name;
  }

  logFunction() {
    console.log('logFunction');
  }

  returnFunction() {
    return 'returnFunction';
  }
}