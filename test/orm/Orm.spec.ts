import { DataSource, EntityManager } from 'typeorm';
import { Member } from '../../src/entitiy/Member';
import { Team } from '../../src/entitiy/Team';

describe('typeORM', () => {

  let em: EntityManager;

  beforeEach(async () => {
    const dataSource = new DataSource({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'orm_test',
      entities: [Member, Team],
      synchronize: true,
      logging: true,
    });
    await dataSource.initialize();
   // await dataSource.dropDatabase();
    em = dataSource.manager;
  });

  it('save', async () => {
    const member = new Member('memberA', 25);
    const savedMember = await em.save(Member, member);
  });

  it('findOneBy -> select 1번, save -> select 1번, insert 1번(team Insert), update 1번(member)', async () => {
    const team = new Team('teamA');
    let member = await em.findOneBy(Member, { id: 4 });
    await em.save(Team, team);
    member.team = team;
    await em.save(Member, member);
  });

  it('findOneBy -> select 1번, insert -> insert 1번(team) update -> update 1번(member)', async () => {
    let member = await em.findOneBy(Member, { id: 3 });
    let team = await em.findOneBy(Team, { id: 3 });
    console.log(member);
    member.team = team;
    await em.update(Member, member.id, {
      team: team,
    });
  });

  it('member, team insert 후 update(연관관계)', async () => {
    const member = new Member('memberA', 25);
    const team = new Team('TeamA');

    await em.save(Member, member);
    await em.save(Team, team);

    await em.update(Member, member, { team: team, })
  });

  it('연관관계 세팅 후 insert(team insert 1번, member insert 1번)', async () => {
    const member = new Member('memberA', 25);
    const team = new Team('TeamA');

    await em.save(Team, team);

    member.team = team;
    await em.save(Member, member);
  });

  it('cascade: true -> insert 2번 (team 1번, member 1번)', async () => {
    const member = new Member('memberA', 25);
    const team = new Team('TeamA');
    member.team = team;

    await em.save(Member, member);
  });

});
