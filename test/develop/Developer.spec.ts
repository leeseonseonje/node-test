import {Developer} from "../../src/develop/Developer";
import {Test, TestingModule} from "@nestjs/testing";
import {AppModule} from "../../src/app.module";

describe('DI Test', () => {
    let sut: Developer;

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        sut = app.get<Developer>(Developer);
    });

    it('DI', async () => {
        expect(sut.develop()).toBe('NestJS');
    });
});
