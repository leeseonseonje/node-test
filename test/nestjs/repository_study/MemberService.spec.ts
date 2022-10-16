import { Test, TestingModule } from '@nestjs/testing';
import { MemberService } from '../../../src/nestjs/repository_study/MemberService';
import { MemberQueryRepository } from '../../../src/nestjs/repository_study/MemberQueryRepository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Member } from '../../../src/entitiy/Member';
import { AppModule } from '../../../src/app.module';
import { Team } from '../../../src/entitiy/Team';

describe('repository test', () => {
  let sut: MemberService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forFeature([Member, Team]), AppModule],
      providers: [MemberService, MemberQueryRepository],
    }).compile();

    sut = app.get<MemberService>(MemberService);
  });

  it('repository test', async () => {
    const members = await sut.test();
    console.log(members);
  });
});
