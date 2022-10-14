import { Test, TestingModule } from '@nestjs/testing';
import { MemberService } from '../../../src/nestjs/repository_study/MemberService';
import { MemberRepository } from '../../../src/nestjs/repository_study/MemberRepository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Member } from '../../../src/entitiy/Member';
import { AppModule } from '../../../src/app.module';
import { Team } from '../../../src/entitiy/Team';

describe('repository test', () => {
  let sut: MemberService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forFeature([Member, Team]), AppModule],
      providers: [MemberService, MemberRepository],
    }).compile();

    sut = app.get<MemberService>(MemberService);
  });

  it('repository test', async () => {
    await sut.test();
  });
});
