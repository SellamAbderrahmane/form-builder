import { ModuleWithProviders, NgModule, Injector } from "@angular/core"

import { Store } from "./Store"
import { StoreService } from "./store.service"
import { STATE, StoreState } from "./store.interface"

@NgModule({})
export class StoreModule {
  static forRoot<T>(selector: string, initialState?: T): ModuleWithProviders<StoreModule> {
    return {
      ngModule: StoreModule,
      providers: [
        StoreService,
        {
          provide: Store,
          deps: [StoreService],
          useFactory: (s: StoreService) => new Store<T>(selector, initialState, s),
        },
        {
          multi: true,
          provide: STATE,
          useFactory: () => {
            return { [selector]: initialState }
          },
        },
      ],
    }
  }

  static forChild<T>(selector: string, initialState?: T): ModuleWithProviders<StoreModule> {
    return {
      ngModule: StoreModule,
      providers: [
        {
          provide: Store,
          deps: [StoreService],
          useFactory: (s: StoreService) => new Store<T>(selector, initialState, s),
        },
        {
          multi: true,
          provide: STATE,
          useFactory: () => {
            return { [selector]: initialState }
          },
        },
      ],
    }
  }

  // static StateInjector: Injector

  // constructor(private injector: Injector) {
  //   StoreModule.StateInjector = this.injector
  // }
}
