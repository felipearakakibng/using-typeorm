import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { SectionsRepository } from "./repositories/sections.repository.interface";
import { CreateSectionDto } from "../http/dtos/in/create.section.dto";
import { Section } from "./models/section.model";

@Injectable()
export class SectionsService {
  constructor(
    @Inject()
    private readonly sectionsRepository: SectionsRepository,
  ) {}

  public async create(data: CreateSectionDto): Promise<Section> {
    return this.sectionsRepository.create(data);
  }

  public async update(
    sectionId: number,
    data: CreateSectionDto,
  ): Promise<Section> {
    return this.sectionsRepository.update(sectionId, data);
  }

  public async get(sectionId: number): Promise<Section> {
    return this.sectionsRepository.findOne(sectionId);
  }

  public async show(sectionId: number): Promise<Section> {
    return this.sectionsRepository.findOne(sectionId);
  }

  public async remove(sectionId: number): Promise<void> {
    const section = await this.sectionsRepository.findOne(sectionId);
    if (!section) throw new BadRequestException("invalid section id");

    return this.sectionsRepository.remove(sectionId);
  }
}
