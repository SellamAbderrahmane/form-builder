import { InjectionToken } from '@angular/core';

export interface StateConfig<T = any> {
  selector: string;
  state?: T;
}

export const STATE = new InjectionToken<StateConfig>('State');
