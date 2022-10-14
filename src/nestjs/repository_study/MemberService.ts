import { Injectable } from '@nestjs/common';
import { MemberRepository } from './MemberRepository';
import { Member } from '../../entitiy/Member';

@Injectable()
export class MemberService {

  constructor(
    private readonly memberRepository:MemberRepository,
  ) {
  }

  async test() {
    await this.memberRepository.test();
    const member = new Member('name', 25);
    await this.memberRepository.repository.save(member);
  }
}