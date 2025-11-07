import { createPix } from "@/features/billing/server/procedures";
import {
  createEntity,
  getManyEntities,
  getManyEntitiesWithFields,
} from "@/features/entities/server/entities-procedures";
import { getManyFields } from "@/features/projects/server/procedures/fields-procedures";
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
  },
  fields: {
    getMany: getManyFields,
  },
  billing: {
    createPix,
  },
};
