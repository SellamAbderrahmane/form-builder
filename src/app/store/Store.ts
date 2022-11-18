import { BehaviorSubject, distinctUntilChanged, finalize, map, Observable } from "rxjs"

import { StoreService } from "./store.service"

export class Store<T> {
  _state$: BehaviorSubject<T>

  constructor(private selector: string, private initialState: T, private service: StoreService) {
    this._state$ = new BehaviorSubject(this.initialState)
  }

  get state(): T {
    return this._state$.getValue()
  }

  setState(newState: Partial<T>) {
    this._state$.next({
      ...this.state,
      ...newState,
    })

    this.service.update(this.selector, this.state)
  }

  select<K extends keyof T>(selector?: K, observer?: (state: T[K]) => void): Observable<T[K]> {
    const observable = this._state$.pipe(
      finalize(() => {
        console.info("select listner ended")
      }),
      map((state: T) => state[selector]),
      distinctUntilChanged()
    )

    if (observer) {
      observable.subscribe({
        next: observer,
        error: console.error,
        complete: console.info,
      })
    }

    return observable
  }

  clear() {
    this._state$.next(null)
    this.service.clear(this.selector)
  }
}
