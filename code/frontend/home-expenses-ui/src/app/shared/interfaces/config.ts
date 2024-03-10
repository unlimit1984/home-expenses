export interface IConfig {
  readonly APP_VERSION: string;
  readonly API: string;

  readonly featureFlags: {
    multiTabMode: boolean;
  };
}
