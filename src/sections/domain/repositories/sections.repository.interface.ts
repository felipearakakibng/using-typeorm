import { CreateSectionDto } from "src/sections/http/dtos/in/create.section.dto";
import { EntityManager } from "typeorm";
import { Section } from "../models/section.model";

export interface SectionsRepository {
  create(
    data: CreateSectionDto,
    trx?: EntityManager,
  ): Promise<Section>;

  update(
    sectionId: number,
    data: CreateSectionDto,
    trx?: EntityManager,
  ): Promise<Section>;

  findOne(sectionId: number, trx?: EntityManager): Promise<Section>;

  remove(sectionId: number, trx?: EntityManager): Promise<void>;
}
export const SECTIONS_REPOSITORY_TOKEN = "sections-repository-token";
