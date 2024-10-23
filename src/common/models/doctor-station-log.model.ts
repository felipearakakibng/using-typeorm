import { Entity, Column, ManyToOne, JoinColumn } from "typeorm";
import { BaseModel } from "./base.model";
import { DoctorStation } from "src/modules/stations/domain/models/doctor-station.model";

@Entity()
export class DoctorStationLog extends BaseModel {
  @ManyToOne(() => DoctorStation)
  @JoinColumn({ name: "doctor_station_id" })
  doctorStation: DoctorStation;

  @Column("json")
  data: any;
}
