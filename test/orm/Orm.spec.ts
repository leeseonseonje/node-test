import {DataSource, EntityManager} from 'typeorm';
import {Member} from '../../src/orm/Member';

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
      entities: [__dirname + '../../src/orm.{ts}'],
      synchronize: true,
      logging: true,
    });
    em = dataSource.manager;
  });

  it('relational', async () => {
    const member = new Member('memberA', 25);
    const savedMember = await em.save(Member, member);
    console.log(savedMember);
  });
});
