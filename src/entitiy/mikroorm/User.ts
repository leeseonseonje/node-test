import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { Company } from './Company';

@Entity()
export class User {

  @PrimaryKey()
  id: number;

  @Property()
  name: string;

  @ManyToOne({nullable: true})
  company: Company;

  constructor(name: string) {
    this.name = name;
  }
}