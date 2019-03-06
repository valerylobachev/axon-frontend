import {ActionTree, GetterTree, MutationTree} from 'vuex';
import {CrudBackendService} from './crud-backend.service';
import {BaseStoreBuilder} from './base-store-builder';
import {CrudState, InitOptions, LoadOptions, UpdateOptions} from './crud-types';
import {RootState} from '../root-state'
import Vue from 'vue'

function buildActions<F, T, S>(
  backendService: CrudBackendService<F, T, S>,
  emptyFilter: F,
  emptyEntity: T): ActionTree<CrudState<F, T, S>, RootState> {
  const baseActions = BaseStoreBuilder.buildActions(backendService, emptyFilter);
  const crudActions = {
    Init(context, {mode, id}: InitOptions) {
      if (mode === 'create' && id === 'new') {
        context.commit('LoadSuccess', {mode, entity: emptyEntity});
      } else {
        context.dispatch('Load', {mode, id});
      }
    },

    Load(context, {mode, id}: InitOptions) {
      context.commit('Load');
      backendService
        .findById(id)
        .then(entity => context.commit('LoadSuccess', {mode, entity}))
        .catch(failure => context.commit('LoadFailure', failure.response.data));
    },

    Create(context, entity: T) {
      context.commit('Create');
      return backendService
        .create(entity)
        .then(entitySummary => context.commit('CreateSuccess', {entity, entitySummary}))
        .catch(failure => {
          console.log(failure)
          context.commit('CreateFailure', failure.response.data)
        });
    },

    Update(context, entity: T) {
      return backendService
        .update(entity)
        .then(entitySummary => context.commit('UpdateSuccess', {entity, entitySummary}))
        .catch(failure => context.commit('UpdateFailure', failure.response.data));
    },

    Delete(context, id: string) {
      return backendService
        .remove(id)
        .then(response => {
          context.commit('DeleteSuccess', id);
        })
        .catch(failure => {
          context.commit('DeleteFailure', failure.response.data);
        });
    },
  };
  return {...baseActions, ...crudActions};
}

function buildGetters<F, T, S>(): GetterTree<CrudState<F, T, S>, RootState> {
  const baseGetters = BaseStoreBuilder.buildGetters();
  const crudGetters = {
    entity: state => state.entity,
    saved: state => state.saved,
    loading: state => state.loading,

    loadingState: state => ({
      loading: state.loading,
      loaded: state.loaded,
    }),

    savingState: state => ({
      saving: state.saving,
      saved: state.saved,
    }),
  };
  return {...baseGetters, ...crudGetters};
}

function buildMutations<F, T, S>(
  idField: string,
  navigateToEdit: (entity: T) => void,
  generateId?: () => string
): MutationTree<CrudState<F, T, S>> {

  const baseMutations = BaseStoreBuilder.buildMutations(idField);
  const crudMutations = {
    Load: (state: CrudState<F, T, S>) => {
      state.failure = null;
      state.loading = true;
      state.loaded = false;
      state.saved = false;
    },

    LoadSuccess: (state: CrudState<F, T, S>, {mode, entity}: LoadOptions<T>) => {
      state.entity = {...entity};
      if (mode === 'create') {
        state.entity[idField] = generateId();
      }
      state.failure = null;
      state.loading = false;
      state.loaded = true;
    },

    LoadFailure: (state: CrudState<F, T, S>, failure: any) => {
      state.entity = null;
      state.failure = failure;
      state.loading = false;
      state.loaded = false;
    },

    Create: (state: CrudState<F, T, S>) => {
      state.saving = true;
      state.failure = null;
      state.saved = false;
    },

    CreateSuccess: (state: CrudState<F, T, S>, {entity, entitySummary}: UpdateOptions<T, S>) => {
      state.saving = false;
      state.failure = null;
      state.saved = true;
      state.entities[entitySummary[idField]] = entitySummary;
      state.entity = {...entity};
      navigateToEdit(entity);
    },

    CreateFailure: (state: CrudState<F, T, S>, failure: any) => {
      state.saving = false;
      state.failure = failure;
      state.saved = false;
    },

    Update: (state: CrudState<F, T, S>) => {
      state.saving = true;
      state.failure = null;
      state.saved = false;
    },

    UpdateSuccess: (state: CrudState<F, T, S>, {entity, entitySummary}: UpdateOptions<T, S>) => {
      state.saving = false;
      state.failure = null;
      state.saved = true;
      state.entities[entitySummary[idField]] = entitySummary;
      state.entity = {...entity};
    },

    UpdateFailure: (state: CrudState<F, T, S>, failure: any) => {
      state.saving = false;
      state.failure = failure;
      state.saved = false;
    },

    Delete: (state: CrudState<F, T, S>, id: string) => {
      state.saving = true;
      state.failure = null;
    },
    DeleteSuccess: (state: CrudState<F, T, S>, id: string) => {
      Vue.delete(state.entities, id)
      state.saving = false;
      state.failure = null;
    },
    DeleteFailure: (state: CrudState<F, T, S>, failure: any) => {
      state.saving = false;
      state.failure = failure;
    },
  };
  return {...baseMutations, ...crudMutations};
}

function buildState<F, T, S>(filter: F, sortBy: string = null, rowsPerPage: number = 10): CrudState<F, T, S> {
  const baseState = BaseStoreBuilder.buildState<F, T, S>(filter, sortBy, rowsPerPage);
  const crudState = {
    mode: null,
    id: null,
    entity: null,

    loading: false,
    loaded: false,

    saving: false,
    saved: false,
  };
  return {...baseState, ...crudState};
}


export const CrudStoreBuilder = {
  buildState,
  buildActions,
  buildGetters,
  buildMutations,
};
