import { Entity, Column, Unique } from "typeorm";

@Entity()
@Unique(["name"])
export class Section {
  @Column()
  name: string;
}
