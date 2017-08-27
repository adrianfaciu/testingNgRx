import { Actions } from '@ngrx/effects';
import { cold } from 'jasmine-marbles';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/empty';

import * as actions from './app.actions';
import { AppStateEffect } from './app.state-effect';
import { reducer } from './app.reducer';

describe('app state effects', () => {
  it('can fetch data with args from state', () => {
    const source = cold('a', { a: { type: actions.DATA_WITH_STATE_FETCH } });
    const storeStub = getStoreStub();

    const effect = new AppStateEffect(new Actions(source), storeStub);

    const expected = cold('a', { a: { type: actions.DATA_WITH_STATE_FETCH_SUCCESS } });
    expect(effect.fetchDataWithState$).toBeObservable(expected);
  });

  function getStoreStub(): any {
    const initialAppState = reducer(undefined, { type: 'INIT_ACTION' });
    return {
      select: (selector) => Observable.of(selector(initialAppState))
    };
  }
});
