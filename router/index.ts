import { createPix } from "@/features/billing/server/procedures";
import {
  createEntity,
  deleteEntity,
  getManyEntities,
  getManyEntitiesWithFields,
  updateEntity,
} from "@/features/entities/server/entities-procedures";
import {
  createField,
  getFakerGeneratorOptions,
  getManyFields,
} from "@/features/fields/server/fields-procedures";
import {
  createProject,
  deleteProject,
  getManyProjects,
  getOneProject,
} from "@/features/projects/server/procedures/projects-procedures";

export const router = {
  projects: {
    getOne: getOneProject,
    getMany: getManyProjects,
    create: createProject,
    delete: deleteProject,
  },
  entities: {
    getMany: getManyEntities,
    getManyWithFields: getManyEntitiesWithFields,
    create: createEntity,
    update: updateEntity,
    delete: deleteEntity,
  },
  fields: {
    getMany: getManyFields,
    getFakerGeneratorOptions,
    create: createField,
  },
  billing: {
    createPix,
  },
};
