import {ActionTree, GetterTree, MutationTree} from 'vuex';
import {BaseBackendService} from './base-backend.service';
import {BaseState, Pagination} from './base-types';
import {RootState} from '../root-state'

function buildActions<F, T, S>(
  backendService: BaseBackendService<F, T, S>,
  emptyFilter: F,
): ActionTree<BaseState<F, T, S>, RootState> {
  return {
    InitFilter(context) {
      if (!context.state.filterInitialized) {
        context.dispatch('Find', emptyFilter);
      }
    },

    Find(context, filter: F) {
      context.commit('Find', filter);
      backendService
        .find(filter)
        .then(response => context.commit('FindSuccess', response))
        .catch(failure => context.commit('FindFailure', failure.response.data));
    },
  }
}

function buildGetters<F, T, S>(): GetterTree<BaseState<F, T, S>, RootState> {
  return {
    filter: state => state.filter,
    pagination: state => state.pagination,
    entityArray: state => Object.values(state.entities),

    entitiesLoading: state => state.entitiesLoading,

    failure: state => state.failure,

  }
}

function buildMutations<F, T, S>(
  idField: string,
): MutationTree<BaseState<F, T, S>> {

  return {
    Find: (state: BaseState<F, T, S>, filter: F) => {
      state.entitiesLoading = true;
      state.filter = filter;
      state.filterInitialized = true;
    },
    FindSuccess: (state: BaseState<F, T, S>, entities: S[]) => {
      state.entitiesLoading = false;
      state.entities = {};
      entities.forEach(s => state.entities[s[idField]] = s);
      state.failure = null;
    },
    FindFailure: (state: BaseState<F, T, S>, failure: any) => {
      state.entities = {};
      state.failure = failure;
      state.entitiesLoading = false;
    },
    SetPagination: (state: BaseState<F, T, S>, pagination: Pagination) => {
      state.pagination = {...pagination}
    },
    ClearFailure: (state: BaseState<F, T, S>) => {
      state.failure = null;
    },

  }
}

function buildState<F, T, S>(filter: F): BaseState<F, T, S> {
  return {
    entities: {},

    filterInitialized: false,
    filter,
    entitiesLoading: false,

    failure: null,

    pagination: {
      sortBy: null,
      descending: false,
      page: 1,
      rowsPerPage: 5
    }
  }
}


export const BaseStoreBuilder = {
  buildState,
  buildActions,
  buildGetters,
  buildMutations,
};
