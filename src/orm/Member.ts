import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class Member {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
}