/* eslint-disable @typescript-eslint/no-explicit-any */
import { StateCreator } from 'zustand';
import { AppConfigSlice } from '@/store/appConfigSlice/type';
import { AuthSlice } from './authSlice';

export type Store = {
  authSlice: AuthSlice;
  appConfigSlice: AppConfigSlice;
};

export interface NormalizedState<T> {
  ids: EntityId[];
  entities: { [id: EntityId]: T };
}

export type EntityId = string | number;

export type CreateEntities<T> = (data: T) => NormalizedState<T>;

export type ImmerStateCreator<T> = StateCreator<
  Store,
  [['zustand/immer', never], never],
  [],
  T
>;

export interface Slice<T, S extends Record<string, (...args: any[]) => void>> {
  state: T;
  actions: S & { onReset: () => void };
}

export type WithSelectors<S> = S extends { getState: () => infer T }
  ? S & { use: { [K in keyof T]: () => T[K] } }
  : never;
