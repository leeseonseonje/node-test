import {EntityManager, MySqlDriver, SchemaGenerator} from '@mikro-orm/mysql';
import {MikroORM} from '@mikro-orm/core';
import {User} from '../../src/entitiy/mikroorm/User';
import { Company } from '../../src/entitiy/mikroorm/Company';

describe('mikro_orm', () => {

  let em: EntityManager;
  let generator: SchemaGenerator;

  beforeEach(async () => {
    const orm = await MikroORM.init<MySqlDriver>({
      entities: ['./dist/entities'],
      entitiesTs: [User, Company],
      name: 'root',
      password: 'root',
      dbName: 'orm_test',
      type: 'mysql',
      debug: true,
    });
    generator = orm.getSchemaGenerator();
    await generator.updateSchema();
    em = orm.em.fork();
  });

  afterEach(async () => {
    await generator.dropSchema();
  });

  it('entityManager -> 1차 캐시에 남아 있으면 select쿼리X, 없으면 select쿼리O', async () => {
    const repository = em.getRepository(User);
    const user = repository.create({name: 'userA'});
    await repository.persist(user);
    await repository.flush();
    em.clear();
    const findUser = await repository.findOne(1);
    console.log(findUser);
  });

  it('transaction', async () => {
    await em.transactional(async em => {
      const user = em.create(User, {name: 'userA'});
      await em.persist(user);
      const findUser = await em.findOne(User, 1);
      console.log(findUser);
    })
  });

  it('change tracking -> setter로 update쿼리', async () => {
    let user = em.create(User, new User('userA'));
    await em.persist(user);
    await em.flush();
    em.clear();
    let findUser = await em.findOne(User, 1);
    findUser.name = 'userB';
    await em.flush();

    let result = await em.findOne(User, 1);
    expect(result.name).toBe('userB');
  });
});