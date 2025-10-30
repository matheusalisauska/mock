import { createPix } from "@/features/billing/server/procedures";
import {
  createProject,
  deleteProject,
  listProjects,
} from "@/features/projects/server/procedures";

export const router = {
  projects: {
    list: listProjects,
    create: createProject,
    delete: deleteProject,
  },
  billing: {
    createPix,
  },
};
