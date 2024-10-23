import { EntityManager, Repository } from "typeorm";
import { SectionsRepository } from "../sections.repository.interface";
import { Section } from "../../models/section.model";
import { CreateSectionDto } from "src/sections/http/dtos/in/create.section.dto";

export class SectionsTypeOrmRepository implements SectionsRepository {
  constructor(private sectionRepository: Repository<Section>) {}

  async remove(sectionId: number, trx?: EntityManager): Promise<void> {
    const where: any = { id: sectionId };
    if (trx) await trx.softDelete(Section, where);
    else await this.sectionRepository.softDelete(where);
    return;
  }

  create(
    { name }: CreateSectionDto,
    trx?: EntityManager,
  ): Promise<Section> {
    const entity = this.sectionRepository.create({
      name,
    });

    if (trx) return trx.save(entity);

    return this.sectionRepository.save(entity);
  }

  findOne(sectionId: number, trx?: EntityManager): Promise<Section> {
    const where: any = { id: sectionId };
    if (trx) return trx.findOne(Section, { where });
    return this.sectionRepository.findOne({ where });
  }

  async update(
    sectionId: number,
    data: CreateSectionDto,
    trx?: EntityManager,
  ): Promise<Section> {
    if (trx) await trx.update(Section, { id: sectionId }, data);
    else await this.sectionRepository.update(sectionId, data);
    return this.findOne(sectionId, trx);
  }
}
