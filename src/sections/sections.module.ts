import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { LoggerModule } from "../common/loggers/logger.module";
import { provideSectionsRepository } from "././domain/repositories/sections.repository.provider";
import { SectionsController } from "./http/sections.controller";
import { SectionsService } from "././domain/sections.service";
import { Section } from "./domain/models/section.model";
@Module({
  imports: [TypeOrmModule.forFeature([Section]), LoggerModule],
  controllers: [SectionsController],
  providers: [SectionsService, ...provideSectionsRepository()],
  exports: [SectionsService],
})
export class SectionsModule {}
