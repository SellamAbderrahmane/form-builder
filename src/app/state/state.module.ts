import { ModuleWithProviders, NgModule } from '@angular/core';
import { STATE, StateConfig } from './state.inerface';
import { Store } from './store';
import { StateService } from './state.service';

@NgModule({})
export class StateModule {
  static forRoot<T>(initialState?: StateConfig<T>): ModuleWithProviders<StateModule> {
    return {
      ngModule: StateModule,
      providers: [
        StateService,
        {
          provide: Store,
          deps: [StateService],
          useFactory: (s: StateService) => {
            return new Store<StateConfig<T>>(initialState, s);
          },
        },
        {
          multi: true,
          provide: STATE,
          useValue: initialState,
        },
      ],
    };
  }

  static forChild<T>(initialState?: StateConfig<T>): ModuleWithProviders<StateModule> {
    return {
      ngModule: StateModule,
      providers: [
        {
          multi: true,
          provide: STATE,
          useValue: initialState,
        },
        {
          provide: Store,
          deps: [StateService],
          useFactory: (s: StateService) => {
            return new Store<StateConfig<T>>(initialState, s);
          },
        },
      ],
    };
  }
}
