import { Injectable, Injector } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { STATE, StateConfig } from './state.inerface';

@Injectable({ providedIn: 'root' })
export class StateService {
  private state$: BehaviorSubject<any>;

  constructor(private injector: Injector) {
    const s: StateConfig[] = this.injector.get<any>(STATE);
    const state = s.reduce((acc, st) => {
      if (st) acc[st.selector] = st.state;
      return acc;
    }, {});
    this.state$ = new BehaviorSubject(state);
  }

  get appState() {
    return this.state$.value;
  }

  get state() {
    return this.state$;
  }

  update(state: StateConfig) {
    this.state$.next({
      ...this.state$.value,
      [state.selector]: state.state,
    });
  }

  select<K>(selector: K): Observable<StateConfig['state'][K]> {
    return this.state$.asObservable().pipe(
      map((state: any) => state[selector]),
      distinctUntilChanged()
    );
  }

  clear() {
    this.state$.next(null);
  }
}
