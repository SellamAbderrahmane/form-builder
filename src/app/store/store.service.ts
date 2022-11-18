import { Injectable, Injector } from "@angular/core"
import { BehaviorSubject, Observable, distinctUntilChanged, map } from "rxjs"

import { STATE, StoreState } from "./store.interface"

@Injectable()
export class StoreService {
  state$: BehaviorSubject<StoreState>

  constructor(private injector: Injector) {
    const s: StoreState[] = this.injector.get<any>(STATE)
    const state = s.reduce((acc, st) => {
      return { ...acc, ...st }
    }, {})

    this.state$ = new BehaviorSubject(state)
  }

  get state() {
    return this.state$.getValue()
  }

  update(selector: string, state: any) {
    this.state$.next({
      ...this.state,
      [selector]: state,
    })
  }

  select<K extends keyof StoreState>(selector: K): Observable<StoreState[K]> {
    return this.state$.asObservable().pipe(
      map((state: any) => state[selector]),
      distinctUntilChanged()
    );
  }

  clear(selector: string) {
    if (!this.state[selector]) return
    const oldState = { ...this.state }
    delete oldState[selector]
    this.state$.next(oldState)
  }
}
