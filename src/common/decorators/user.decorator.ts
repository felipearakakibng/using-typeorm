import {
  BadRequestException,
  createParamDecorator,
  ExecutionContext,
} from "@nestjs/common";
import { User as UserModel } from "src/modules/users/domain/models/users.model";

export const User = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user as UserModel & { companyIds: number[] };
    if (data && !user?.[data])
      throw new BadRequestException(`${data} is required`);
    return data ? user?.[data] : user;
  },
);
