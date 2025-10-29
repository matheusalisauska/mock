import { debounce, useQueryStates } from "nuqs";
import { projectParams } from "../params";

export const useProjectParams = () => {
  return useQueryStates(projectParams, {
    limitUrlUpdates: debounce(250),
    shallow: false,
  });
};
