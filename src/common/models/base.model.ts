import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from "typeorm";

@Entity()
export abstract class BaseModel {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ name: "is_active", default: true })
  public isActive: boolean;

  @CreateDateColumn({ name: "created_at" })
  public createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  public updatedAt: Date;

  @DeleteDateColumn({ name: "deleted_at", nullable: true })
  public deletedAt: Date | null;
}
