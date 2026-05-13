export const featureFlags = {
  aiInsights:       true,
  heatmapAnalytics: true,
  forecastingChart: true,
  exportReports:    true,
  mfaRequired:      true,
  darkModeToggle:   false,  // future
  multiTenant:      false,  // future
} as const;

export type FeatureFlag = keyof typeof featureFlags;
export const isEnabled = (flag: FeatureFlag) => featureFlags[flag];
