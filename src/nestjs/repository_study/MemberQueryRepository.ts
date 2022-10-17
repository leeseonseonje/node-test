import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Member } from '../../entitiy/typeorm/Member';

@Injectable()
export class MemberQueryRepository {

  constructor(
    private readonly dataSource: DataSource,
  ) {
  }

  async test() {
    console.log('test Repository method');
    return await this.dataSource.getRepository(Member).createQueryBuilder('member')
      .select(['member.name', 'member.age', 'team.name'])
      .innerJoin('member.team', 'team')
      .getMany();
  }
}``