import { StateConfig } from 'src/app/state';

export interface HomeState {}

export type SHome = StateConfig<HomeState>;

export const initialState: HomeState = {
  loading: false,
};
