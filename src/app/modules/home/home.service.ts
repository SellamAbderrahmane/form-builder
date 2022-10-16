import { Injectable } from '@angular/core';

import { Store } from 'src/app/state';
import { HomeState, SHome } from './home.state';
import { HttpService, Status, Tools } from 'src/app/shared';

@Injectable({ providedIn: 'root' })
export class HomeService extends Tools {
  constructor(
    private http: HttpService,
    private store: Store<SHome>
  ) {
    super();
  }

  get state(): HomeState {
    return this.store.state;
  }

}
