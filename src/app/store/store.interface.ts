import { InjectionToken } from '@angular/core';

export type StoreState = { [key: string]: any }

export const STATE = new InjectionToken<StoreState>('State');