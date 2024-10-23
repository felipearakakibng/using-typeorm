import { Injectable, Provider } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Section } from "../models/section.model";
import { SECTIONS_REPOSITORY_TOKEN } from "./sections.repository.interface";
import { SectionsTypeOrmRepository } from "././implementations/sections.typeorm.repository";

export function provideSectionsRepository(): Provider[] {
  return [
    {
      provide: SECTIONS_REPOSITORY_TOKEN,
      useFactory: async (sectionsDependencieProvider: SectionsRepoDependenciesProvider) =>
        provideSectionsRepositoryFactory(sectionsDependencieProvider),
      inject: [SectionsRepoDependenciesProvider],
    },
    SectionsRepoDependenciesProvider,
  ];
}

async function provideSectionsRepositoryFactory(
  sectionsDependencieProvider: SectionsRepoDependenciesProvider,
) {
  await ConfigModule.envVariablesLoaded;
  return new SectionsTypeOrmRepository(sectionsDependencieProvider.typeOrmRepository);
}

@Injectable()
export class SectionsRepoDependenciesProvider {
  constructor(
    @InjectRepository(Section)
    public typeOrmRepository: Repository<Section>,
  ) {}
}
