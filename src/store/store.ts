import Vue from "vue";
import Vuex, {StoreOptions} from 'vuex';
import {RootState} from './root-state'
import {app} from './app'
import {bpmDiagram} from './bpm-diagram/store'
import {bpmDeployment} from './deployment/store'
import {knowledgeDataSchema} from './data-schema/store'

Vue.use(Vuex);

const storeOptions: StoreOptions<RootState> = {
  state: {
    version: '1.0.0',
  },
  modules: {
    app,
    bpmDiagram,
    bpmDeployment,
    knowledgeDataSchema

  },
};

export default function () {
  const Store = new Vuex.Store<RootState>(storeOptions);

  return Store;
}
