import {DataSource, EntityManager} from 'typeorm';
import {Member} from '../../src/entitiy/typeorm/Member';
import {Team} from '../../src/entitiy/typeorm/Team';

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
      logging: false,
    });
    await dataSource.initialize();
    em = dataSource.manager;

    await em.transaction(async (em) => {
      let lazyTeamA = new Team('lazyTeamA');
      let lazyTeamB = new Team('lazyTeamB');
      let lazyTeamC = new Team('lazyTeamC');
      let lazyTeamD = new Team('lazyTeamD');
      let lazyTeamE = new Team('lazyTeamE');

      let memberA = new Member('memberA', 20);
      memberA.lazyTeam = Promise.resolve(lazyTeamA);
      let memberB = new Member('memberB', 20);
      memberB.lazyTeam = Promise.resolve(lazyTeamB);
      let memberC = new Member('memberC', 20);
      memberC.lazyTeam = Promise.resolve(lazyTeamC);
      let memberD = new Member('memberD', 20);
      memberD.lazyTeam = Promise.resolve(lazyTeamD);
      let memberE = new Member('memberE', 20);
      memberE.lazyTeam = Promise.resolve(lazyTeamE);

      await em.save(Member, memberA);
      await em.save(Member, memberB);
      await em.save(Member, memberC);
      await em.save(Member, memberD);
      await em.save(Member, memberE);
    });

    dataSource.setOptions({logging: true});
  });

  afterEach(async () => {
    dataSource.setOptions({logging: false});
    await dataSource.dropDatabase();
  })

  it('N + 1', async () => {
    let members = await em.find(Member);

    for (const member of members) {
      let lazyTeam = await member.lazyTeam;
      console.log(lazyTeam.name);
    }
  });
});
