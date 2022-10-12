import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import {Team} from './Team';

@Entity()
export class Member {

  @PrimaryGeneratedColumn()
  readonly id: number;

  @Column()
  readonly name: string;

  @Column()
  readonly age: number;

  @ManyToOne(() => Team, { cascade: true, onDelete: 'CASCADE' })
  team: Team;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
}