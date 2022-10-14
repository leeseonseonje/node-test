import { Repository } from 'typeorm';
import { Member } from '../../entitiy/Member';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class MemberRepository {
  constructor(
    @InjectRepository(Member)
    readonly repository: Repository<Member>,
  ) {
  }

  async test() {
    console.log('test Repository method');
    let members = await this.repository.find();
    console.log(members);
  }
}