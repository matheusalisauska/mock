import { createPix } from "@/features/billing/server/procedures";
import {
  getManyEntities,
  getManyEntitiesWithFields,
} from "@/features/projects/server/procedures/entities-procedures";
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
  },
  fields: {
    getMany: getManyFields,
  },
  billing: {
    createPix,
  },
};
