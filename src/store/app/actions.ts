import {ActionTree} from 'vuex';
import {RootState} from '../root-state';
import {AppState} from './state';

export const actions: ActionTree<AppState, RootState> = {
  SetLanguage({commit}, lang: string) {
    commit('SetLanguage', lang);
  },

  ToggleLeftDrawer({commit}) {
    commit('ToggleLeftDrawer');
  },

  Login({commit}, profile: Keycloak.KeycloakProfile) {
    commit('AuthLogin', profile);
  },
  Logout({commit}) {
    commit('AuthLogout');
  },

};
