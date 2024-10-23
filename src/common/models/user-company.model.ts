import { Entity, ManyToOne, JoinColumn, Unique } from "typeorm";
import { User } from "src/modules/users/domain/models/users.model";
import { Company } from "../../modules/companies/domain/models/company.model";
import { BaseModel } from "./base.model";

@Entity()
@Unique(["user", "company"])
export class UserCompany extends BaseModel {
  @ManyToOne(() => User)
  @JoinColumn({ name: "user_id" })
  user: User;

  @ManyToOne(() => Company)
  @JoinColumn({ name: "company_id" })
  company: Company;
}
