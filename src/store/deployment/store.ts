import {Module} from 'vuex';
import {emptyProcessDefFilter, FindProcessDefOptions, ProcessDef} from './model';
import {BaseState} from '../base-store/base-types'
import {BaseStoreBuilder} from '../base-store/base-store-builder'
import bpmDeploymentBackendService from './backend.service'
import {RootState} from '../root-state'

export interface BpmDeploymentState
    extends BaseState<FindProcessDefOptions, ProcessDef, ProcessDef> {
}

const state: BpmDeploymentState = BaseStoreBuilder.buildState(emptyProcessDefFilter(), 'key');

const actions = BaseStoreBuilder.buildActions<FindProcessDefOptions, ProcessDef, ProcessDef>(
    bpmDeploymentBackendService, emptyProcessDefFilter(),
);

const mutations = BaseStoreBuilder.buildMutations<FindProcessDefOptions, ProcessDef, ProcessDef>('id');

const getters = BaseStoreBuilder.buildGetters<FindProcessDefOptions, ProcessDef, ProcessDef>();

const namespaced: boolean = true;

export const BPM_DEPLOYMENT_NAMESPACE: string = 'bpmDeployment';

export const bpmDeployment: Module<BpmDeploymentState, RootState> = {
    namespaced,
    state,
    mutations,
    actions,
    getters,
};



