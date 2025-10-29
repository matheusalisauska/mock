import { createLoader } from "nuqs/server";
import { projectParams } from "../params";

export const projectParamsLoader = createLoader(projectParams);

export type ProjectParams = Awaited<ReturnType<typeof projectParamsLoader>>;
