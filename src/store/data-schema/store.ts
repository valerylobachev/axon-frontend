import {Module} from 'vuex';
import {
    DataSchema,
    DataSchemaFilter,
    DataSchemaSummary,
    emptyDataSchemaFilter, newDataSchema,
} from './model';
import dataSchemaBackendService from './backend.service';
import {CrudState} from '../base-store/crud-types'
import {CrudStoreBuilder} from '../base-store/crud-store-builder'
import {RootState} from '../root-state'
import Router from '../../router'


export interface DataSchemaState
    extends CrudState<DataSchemaFilter, DataSchema, DataSchemaSummary> {
}

export const state: DataSchemaState =
    CrudStoreBuilder.buildState<DataSchemaFilter, DataSchema, DataSchemaSummary>(emptyDataSchemaFilter(), 'key');


const actions = CrudStoreBuilder.buildActions<DataSchemaFilter, DataSchema, DataSchemaSummary>(
    dataSchemaBackendService, emptyDataSchemaFilter(), newDataSchema(),
);

const mutations = CrudStoreBuilder.buildMutations<DataSchemaFilter, DataSchema, DataSchemaSummary>(
    'key',
    entity => Router.push(`/config/data-schema/edit/${entity.key}`),
    () => '',
);

const getters = CrudStoreBuilder.buildGetters<DataSchemaFilter, DataSchema, DataSchemaSummary>();

const namespaced: boolean = true;

export const KNOWLEDGE_DATA_SCHEMA_NAMESPACE: string = 'knowledgeDataSchema';

export const knowledgeDataSchema: Module<DataSchemaState, RootState> = {
    namespaced,
    state: {...state},
    mutations,
    actions,
    getters,
};


