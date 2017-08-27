import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';

import 'rxjs/add/operator/debounceTime';

import * as actions from './app.actions';

@Injectable()
export class AppTimeEffect {
  constructor(private actions$: Actions,
  ) { }

  @Effect()
  fetchDataWithDebounce$ = this.actions$
      .ofType(actions.DATA_WITH_DEBOUNCE_FETCH)
      .debounceTime(100)
      // Call API service or some other processing
      .map(() => ({ type: actions.DATA_WITH_DEBOUNCE_FETCH_SUCCESS }));
}
