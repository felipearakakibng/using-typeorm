import { Entity, Column, ManyToOne, JoinColumn } from "typeorm";

import { BaseModel } from "./base.model";
import { User } from "src/modules/users/domain/models/users.model";
import { DoctorStation } from "src/modules/stations/domain/models/doctor-station.model";

@Entity()
export class Observation extends BaseModel {
  @ManyToOne(() => User)
  @JoinColumn({ name: "user_id" })
  user: User;

  @ManyToOne(() => DoctorStation)
  @JoinColumn({ name: "doctor_station_id" })
  doctorStation: DoctorStation;

  @Column()
  text: string;
}
