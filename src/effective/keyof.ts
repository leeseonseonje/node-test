interface Person {
  name: string;
}

interface Lifespan {
  // name: string;
  birth: Date;
  death?: Date;
}

type K = keyof Person;

type L = keyof Lifespan;

type A = keyof (Person | Lifespan);

type or = Person | Lifespan;
type B = (keyof Person) | (keyof Lifespan);
