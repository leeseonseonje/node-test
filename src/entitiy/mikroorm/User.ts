import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { Company } from './Company';

@Entity()
export class User {

  @PrimaryKey({name: 'id'})
  private _id: number;

  @Property()
  private _name: string;

  @ManyToOne(() => Company)
  private readonly _company: Company;


  constructor(name: string, company: Company = new Company('company')) {
    this._name = name;
    this._company = company;
  }

  get id(): number {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get company(): Company {
    return this._company;
  }

  changeUsername(name: string) {
    this._name = name;
  }
}