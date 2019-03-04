import {GetterTree} from 'vuex';
import {RootState} from '../root-state';
import {AppState} from './state';

export const getters: GetterTree<AppState, RootState> = {
  languages: state => state.languages,
  language: state => state.language,

  leftDrawerOpen: state => state.leftDrawerOpen,

  isAuthenticated: state => state.isAuthenticated,
  profile: state => state.profile,
};
