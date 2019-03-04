export interface AppState {
  language: string,
  languages: string[]

  leftDrawerOpen: boolean

  isAuthenticated: boolean;
  profile: Keycloak.KeycloakProfile
}
