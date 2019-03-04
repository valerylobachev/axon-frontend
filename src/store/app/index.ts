import {Module} from 'vuex';
// @ts-ignore
import { Platform, Screen } from 'quasar';
import {RootState} from '../root-state';
import {actions} from './actions';
import {getters} from './getters';
import {mutations} from './mutations';
import {AppState} from './state';

const state: AppState = {
  language: 'en',
  languages: ['en', 'ru'],

  leftDrawerOpen: Platform.is.desktop && Screen.gt.sm,

  isAuthenticated: false,
  profile: null,
};

const namespaced = true;

export const app: Module<AppState, RootState> = {
  namespaced,
  state,
  mutations,
  actions,
  getters,
};
