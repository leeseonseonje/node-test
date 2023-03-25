import { DataSource, EntityManager } from 'typeorm';
import { Member } from '../../src/entitiy/typeorm/Member';
import { Team } from '../../src/entitiy/typeorm/Team';

describe('typeORM', () => {
  let em: EntityManager;
  let dataSource: DataSource;

  beforeEach(async () => {
    dataSource = new DataSource({
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
    em = dataSource.manager;
  });

  afterEach(async () => {
    // await dataSource.dropDatabase();
  });

  it('save', async () => {
    const member = new Member('memberA', 25);

    const savedMember = await em.save(Member, member);

    expect(savedMember.name).toBe('memberA');
  });

  it('findOneBy -> select 1번, save -> select 1번, insert 1번(team Insert), update 1번(member)', async () => {
    const team = new Team('teamA');
    let savedMember = await em.save(Member, new Member('memberA', 25));
    let member = await em.findOneBy(Member, { id: savedMember.id });
    await em.save(Team, team);
    // member.name = 'memberABC';

    em.update(Member, member.id, {
      name: 'memberABC',
    });
    // const updateMember = await em.save(Member, member);

    // expect(updateMember.team.name).toBe('teamA');
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

    const updateResult = await em.update(Member, member, { team: team });

    console.log(updateResult);
    expect(updateResult.affected).toBe(1);
  });

  it('연관관계 세팅 후 insert(team insert 1번, member insert 1번)', async () => {
    const member = new Member('memberA', 25);
    const team = new Team('TeamA');
    await em.save(Team, team);
    member.team = team;

    const savedMember = await em.save(Member, member);

    expect(savedMember.team.name).toBe('TeamA');
  });

  it('cascade: true -> insert 2번 (team 1번, member 1번)', async () => {
    const member = new Member('memberA', 25);
    member.team = new Team('TeamA');

    const savedMember = await em.save(Member, member);

    expect(savedMember.team.name).toBe('TeamA');
  });

  it('cascade delete', async () => {
    const member = new Member('memberA', 25);
    member.team = new Team('TeamA');

    await em.save(Member, member);

    await em.delete(Member, member);
  });
});
