import { DataSource, EntityManager } from 'typeorm';
import { Member } from '../../src/entitiy/Member';
import { Team } from '../../src/entitiy/Team';

describe('typeORM', () => {

  let em: EntityManager;
  let dataSource: DataSource;
  let memberA: Member;
  let memberB: Member;
  let memberC: Member;
  let memberD: Member;
  let memberE: Member;
  let savedTeam: Team;

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

    await em.transaction(async (em) => {
      let team = new Team('TeamA');
      savedTeam = await em.save(Team, team);

      memberA = new Member('memberA', 25);
      console.log('create member');
      memberA.team = savedTeam;
      console.log('team mapping');
      memberA = await em.save(Member, memberA);
      console.log('member save');

      memberB = new Member('memberB', 25);
      memberB.team = savedTeam;
      memberB = await em.save(Member, memberB);

      memberC = new Member('memberC', 25);
      memberC.team = savedTeam;
      memberC = await em.save(Member, memberC);

      memberD = new Member('memberD', 25);
      memberD.team = savedTeam;
      memberD = await em.save(Member, memberD);

      memberE = new Member('memberE', 25);
      memberE.team = savedTeam;
      memberE = await em.save(Member, memberE);
    })
  });

  //afterEach(async () => {
  //  await dataSource.dropDatabase();
  //})

  it('save', async () => {
    let members = await em.find(Member);
    console.log(members);
    console.log(members.pop().team);
  });
});
