import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Store } from '@ngrx/store';

import 'rxjs/add/operator/withLatestFrom';
import 'rxjs/add/operator/map';

import { AppState } from './app.reducer';
import * as actions from './app.actions';

@Injectable()
export class AppStateEffect {
  constructor(private actions$: Actions,
              private store: Store<AppState>,
  ) { }

  numberStream$ = this.store.select(mf => mf.count);
  textStream$ = this.store.select(mf => mf.text);

  @Effect()
  fetchDataWithState$ = this.actions$
      .ofType(actions.DATA_WITH_STATE_FETCH)
      .withLatestFrom(this.numberStream$, this.textStream$)
      .map(([action, number, text]) => ({ type: actions.DATA_WITH_STATE_FETCH_SUCCESS }));
}
