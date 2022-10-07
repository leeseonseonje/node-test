import { Test, TestingModule } from '@nestjs/testing';
import {Developer} from "./develop/Developer";
import {NestJS} from "./develop/NestJS";

describe('DI Test', () => {
  let sut: Developer;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [Developer, NestJS],
    }).compile();

    sut = app.get<Developer>(Developer);
  });

  it('DI', async () => {
    sut.develop();
  });
});
