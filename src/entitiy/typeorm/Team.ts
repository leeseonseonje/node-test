import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class Team {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  constructor(name: string) {
    this.name = name;
  }
}