import { Injectable } from '@nestjs/common';
import { DataSource, Repository, } from 'typeorm';
import { Member } from '../../entitiy/Member';
import { dateTimestampProvider } from 'rxjs/internal/scheduler/dateTimestampProvider';
import { Team } from '../../entitiy/Team';

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
}