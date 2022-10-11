import {DataSource, EntityManager} from 'typeorm';
import {Member} from '../../src/entitiy/Member';
import {Team} from '../../src/entitiy/Team';

describe('typeORM', () => {

  let em: EntityManager;

  beforeEach(async () => {
    const dataSource = new DataSource({
      type: "mysql",
      host: "localhost",
      port: 3306,
      username: "root",
      password: "root",
      database: "orm_test",
      entities: [Member, Team],
      synchronize: true,
      logging: true,
    });
    em = dataSource.manager;
  });

  it('relational', async () => {
    const team = new Team('teamA');
    const member = new Member('memberA', 25, team);
    const savedMember = await em.save(member);
    console.log(savedMember);
  });
});
