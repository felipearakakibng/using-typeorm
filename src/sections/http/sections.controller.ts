import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from "@nestjs/common";

import { CreateSectionDto } from "./dtos/in/create.section.dto";
import { SectionsService } from "../domain/sections.service";
import { Section } from "../domain/models/section.model";
import { AuthGuard } from "@nestjs/passport";
import { IdParamDto } from "src/common/validators/general.module";
import { ApiTags } from '@nestjs/swagger';

@UseGuards(AuthGuard("company-jwt"))
@ApiTags("Sections")
@Controller("sections")
export class SectionsController {
  constructor(private readonly sectionsService: SectionsService) {}

  @Post()
  create(
    @Param() { id }: IdParamDto,
    @Body() data: CreateSectionDto,
  ): Promise<Section> {
    return this.sectionsService.create(data);
  }

  @Patch("/:id")
  update(
    @Param() { id }: IdParamDto,
    @Body() data: CreateSectionDto,
  ): Promise<Section> {
    const sectionId = id;
    return this.sectionsService.update(sectionId, data);
  }

  @Get("/:id")
  get(@Param() { id }: IdParamDto): Promise<Section> {
    const sectionId = id;
    return this.sectionsService.get(sectionId);
  }

  @Delete("/:id")
  remove(@Param() { id }: IdParamDto): Promise<void> {
    const sectionId = id;
    return this.sectionsService.remove(sectionId);
  }
}
