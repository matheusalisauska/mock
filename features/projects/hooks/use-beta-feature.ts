import posthog from "posthog-js";

export function useBetaFeature() {
  return posthog.isFeatureEnabled("create-project-button");
}
