import {Entity, PrimaryKey, Property, SerializedPrimaryKey} from '@mikro-orm/core';

@Entity()
export class User {

  @PrimaryKey()
  id: number;

  @Property()
  name: string;

  constructor(name: string) {
    this.name = name;
  }
}