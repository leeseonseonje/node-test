import {DataSource, EntityManager} from 'typeorm';
import {Member} from '../../src/entitiy/Member';
import {Team} from '../../src/entitiy/Team';

describe('typeORM', () => {

  let em: EntityManager;
  let dataSource: DataSource;
  let memberA: Member;
  let memberB: Member;
  let memberC: Member;
  let memberD: Member;
  let memberE: Member;

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
      logging: false,
    });
    await dataSource.initialize();
    em = dataSource.manager;

    await em.transaction(async (em) => {
      let team = new Team('TeamA');

      memberA = new Member('memberA', 25);
      memberA.team = team;
      memberA = await em.save(Member, memberA);

      memberB = new Member('memberB', 25);
      memberB.team = team;
      memberB = await em.save(Member, memberB);

      memberC = new Member('memberC', 25);
      memberC.team = team;
      memberC = await em.save(Member, memberC);

      memberD = new Member('memberD', 25);
      memberD.team = team;
      memberD = await em.save(Member, memberD);

      memberE = new Member('memberE', 25);
      memberE.team = team;
      memberE = await em.save(Member, memberE);
    });

    dataSource.setOptions({logging: true});
  });

  afterEach(async () => {
    dataSource.setOptions({logging: false});
    await dataSource.dropDatabase();
  })

  it('find { relations } -> left join', async () => {
    let members = await em.find(Member, {
      relations: ['team'],
    });

    for (const member of members) {
      console.log(member.team);
      expect(member.team.name).toBe('TeamA');
    }
  });

  it('eager loading', async () => {
    let eagerTeam = new Team('eagerTeam');
    let eagerMember = new Member('eagerMember', 10);

    eagerMember.eagerTeam = eagerTeam;
    await em.save(Member, eagerMember);

    let findMember = await em.findOneBy(Member, {id: eagerMember.id});
    console.log(findMember);
    expect(findMember.eagerTeam.name).toBe('eagerTeam');
  });

  it('lazy loading', async () => {
    let lazyTeam = new Team('lazyTeam');
    let lazyMember = new Member('lazyMember', 10);

    lazyMember.lazyTeam = Promise.resolve(lazyTeam);
    await em.save(Member, lazyMember);

    let findMember = await em.findOneBy(Member, {id: lazyMember.id});
    console.log(findMember);

    let team = await findMember.lazyTeam;
    console.log(team.name);
  });
});
