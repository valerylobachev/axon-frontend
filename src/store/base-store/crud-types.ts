import {BaseState} from './base-types';

export interface CrudState<F, T, S> extends BaseState<F, T, S> {
    mode: string;
    id: string
    entity: T;

    loading: boolean;
    loaded: boolean;

    saving: boolean;
    saved: boolean;
}

export interface InitOptions {
    mode: string,
    id: string
}

export interface LoadOptions<T> {
    mode: string,
    entity: T
}

export interface UpdateOptions<T, S> {
    entity: T
    entitySummary: S
}
