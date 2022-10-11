import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class Team {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => Team)
  team: Team;


  constructor(name: string, team: Team) {
    this.name = name;
    this.team = team;
  }
}