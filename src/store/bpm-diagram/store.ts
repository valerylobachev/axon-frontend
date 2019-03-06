import {Module} from 'vuex';
import uuidv4 from 'uuid/v4';
import {CrudState, InitOptions} from '../base-store/crud-types'
import {
  BpmDiagram,
  BpmDiagramFilter,
  BpmDiagramSummary,
  emptyBpmDiagramFilter,
  newBpmnDiagram, newCmmnDiagram,
  newDmnDiagram
} from './model'
import {CrudStoreBuilder} from '../base-store/crud-store-builder'
import bpmDiagramBackendService from './backend.service'
import {RootState} from '../root-state'
import Router from '../../router'


export interface BpmDiagramState
  extends CrudState<BpmDiagramFilter, BpmDiagram, BpmDiagramSummary> {
}

export const state: BpmDiagramState =
  CrudStoreBuilder.buildState<BpmDiagramFilter, BpmDiagram, BpmDiagramSummary>(emptyBpmDiagramFilter(), 'name');


const crudActions = CrudStoreBuilder.buildActions<BpmDiagramFilter, BpmDiagram, BpmDiagramSummary>(
  bpmDiagramBackendService, emptyBpmDiagramFilter(), newBpmnDiagram(),
);

const actions = {
  ...crudActions,
  Init(context, {mode, id}: InitOptions) {
    if (mode === 'create' && id === 'BPMN') {
      context.commit('LoadSuccess', {mode, entity: newBpmnDiagram()});
    } else if (mode === 'create' && id === 'DMN') {
      context.commit('LoadSuccess', {mode, entity: newDmnDiagram()});
    } else if (mode === 'create' && id === 'CMMN') {
      context.commit('LoadSuccess', {mode, entity: newCmmnDiagram()});
    } else {
      context.dispatch('Load', {mode, id});
    }
  },
}

const mutations = CrudStoreBuilder.buildMutations<BpmDiagramFilter, BpmDiagram, BpmDiagramSummary>(
  'id',
  entity => {
    Router.push(`/config/bpm-diagram/edit/${entity.id}`)
  },
  () => 'qqqq' //uuidv4()
);

const getters = CrudStoreBuilder.buildGetters<BpmDiagramFilter, BpmDiagram, BpmDiagramSummary>();


const namespaced: boolean = true;

export const BPM_DIAGRAM_NAMESPACE: string = 'bpmDiagram';

export const bpmDiagram: Module<BpmDiagramState, RootState> = {
  namespaced,
  state,
  mutations,
  actions,
  getters,
};



