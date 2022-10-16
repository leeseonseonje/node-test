import { Injectable } from '@nestjs/common';
import { MemberQueryRepository } from './MemberQueryRepository';
import { Member } from '../../entitiy/typeorm/Member';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Team } from '../../entitiy/typeorm/Team';

@Injectable()
export class MemberService {

  constructor(
    @InjectRepository(Member)
    private readonly memberRepository: Repository<Member>,
    private readonly memberQueryRepository: MemberQueryRepository,
  ) {
  }

  async test() {
    let member = new Member('name', 25);
    member.team = new Team('TeamA');
    await this.memberRepository.save(member);
    return await this.memberQueryRepository.test();
  }
}