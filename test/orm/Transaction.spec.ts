import {DataSource, EntityManager} from 'typeorm';
import {Member} from '../../src/entitiy/Member';
import {Team} from '../../src/entitiy/Team';
import { raw } from 'express';

describe('transaction', () => {

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


    dataSource.setOptions({logging: true});
  });

  afterEach(async () => {
    dataSource.setOptions({logging: false});
    await dataSource.dropDatabase();
  });

  it('autoCommit: true', async () => {
    const repository = em.getRepository(Member);
    const savedMember = await repository.save(new Member('name', 25));

    const findMember = await repository.findOneBy({ id: savedMember.id});

    expect(findMember.name).toBe('name');
    expect(findMember.age).toBe(25);
  });

  it('autoCommit: false', async () => {
    await em.transaction( async manager => {
      const savedMember = await manager.save(Member, new Member('name', 25));

      const findMember = await manager.findOneBy(Member, {id: savedMember.id});

      expect(findMember.name).toBe('name');
      expect(findMember.age).toBe(25);
    })
  });
});
