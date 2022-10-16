import { Observable, BehaviorSubject, Subscription } from 'rxjs';
import { distinctUntilChanged, map, finalize } from 'rxjs/operators';
import { StateConfig } from './state.inerface';
import { StateService } from './state.service';

export class Store<T extends StateConfig> {
  private _state$: BehaviorSubject<StateConfig<T>>;

  subscription: Subscription;

  constructor(initialState: T, private service: StateService) {
    this.subscription = new Subscription();
    this._state$ = new BehaviorSubject(initialState);
    this.service.update(initialState);
  }

  private get state$(): Observable<StateConfig<T>> {
    return this._state$.asObservable();
  }

  private get currentState(): StateConfig<T> {
    return this._state$.getValue();
  }

  get state(): T['state'] {
    return this.currentState.state;
  }

  clear() {
    this._state$.next({
      selector: this.currentState.selector,
      state: null,
    });
    this.service.update(this.currentState);
    return;
  }

  //dispatch
  setState(newState?: T['state']): Promise<T> {
    this._state$.next({
      selector: this.currentState.selector,
      state: {
        ...this.currentState.state,
        ...newState,
      },
    });
    this.service.update(this.currentState);
    return Promise.resolve(this.currentState.state);
  }

  select<K extends keyof T['state']>(
    selector?: K,
    observer?: (item: T['state']) => void
  ): Observable<T[K]> {
    const observable = this.state$.pipe(
      finalize(() => {
        console.info('select listner ended');
      }),
      map((state: T) => state.state[selector]),
      distinctUntilChanged()
    );
    if (observer) {
      const obr = observable.subscribe(
        observer,
        (error) => {
          console.log('select listner ended' + error);
        },
        () => {
          console.log('select listner ended');
        }
      );

      this.subscription.add(obr);
    }
    return observable;
  }
}
