import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import {Team} from './Team';

@Entity()
export class Member {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  age: number;

  @ManyToOne(() => Team)
  team: Team;

  constructor(name: string, age: number, team: Team) {
    this.name = name;
    this.age = age;
    this.team = team;
  }
}