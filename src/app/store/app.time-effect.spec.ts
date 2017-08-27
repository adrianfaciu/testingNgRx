import { Actions } from '@ngrx/effects';
import { cold, getTestScheduler } from 'jasmine-marbles';
import { Observable } from 'rxjs/Observable';

import * as actions from './app.actions';
import { AppTimeEffect } from './app.time-effect';

describe('app time effects', () => {
  it('can fetch data with debounce (mocking debounce)', () => {
    const source = cold('a', { a: { type: actions.DATA_WITH_DEBOUNCE_FETCH } });

    mockObservable();
    const effect = new AppTimeEffect(new Actions(source));

    const expected = cold('a', { a: { type: actions.DATA_WITH_DEBOUNCE_FETCH_SUCCESS } });
    expect(effect.fetchDataWithDebounce$).toBeObservable(expected);
  });

  it('can fetch data with debounce (test scheduler)', () => {
    const source = cold('a', { a: { type: actions.DATA_WITH_DEBOUNCE_FETCH } });

    mockObservableWithScheduler(getTestScheduler());
    const effect = new AppTimeEffect(new Actions(source));

    // - is a 10 frame interval, since we use 100 in the effect we use 10 - characters
    const expected = cold('----------a', { a: { type: actions.DATA_WITH_DEBOUNCE_FETCH_SUCCESS } });
    expect(effect.fetchDataWithDebounce$).toBeObservable(expected);
  });

  function mockObservable() {
    spyOn(Observable.prototype, 'debounceTime').and.callFake(function () {
      return this;
    });
  }

  function mockObservableWithScheduler(scheduler) {
    const originalDebounce = Observable.prototype.debounceTime;
    spyOn(Observable.prototype, 'debounceTime').and.callFake(function (time) {
      return originalDebounce.call(this, time, scheduler);
    });
  }
});
