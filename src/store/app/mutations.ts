import {MutationTree} from 'vuex';
import {AppState} from './state';
import {i18n} from '../../boot/i18n';

export const mutations: MutationTree<AppState> = {
  SetLanguage: (state: AppState, lang: string) => {
    state.language = lang;
    i18n.locale = lang;
  },

  ToggleLeftDrawer(state: AppState) {
    state.leftDrawerOpen = ! state.leftDrawerOpen
  },

  SetLeftDrawer(state: AppState, open: boolean ) {
    state.leftDrawerOpen = open
  },

  AuthLogin: (state: AppState, profile: Keycloak.KeycloakProfile) => {
    state.isAuthenticated = true;
    state.profile = profile;
  },

  AuthLogout: (state: AppState) => {
    state.isAuthenticated = false;
    state.profile = null;
  },
};
