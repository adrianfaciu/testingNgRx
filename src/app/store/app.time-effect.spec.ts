import { Actions } from '@ngrx/effects';
import { cold, hot, getTestScheduler } from 'jasmine-marbles';
import { Observable } from 'rxjs/Observable';

import { fakeAsync, tick } from '@angular/core/testing';

import * as actions from './app.actions';
import { AppTimeEffect } from './app.time-effect';

describe('app time effects', () => {
  xit('can fetch data with debounce', () => {
    const source = hot('a', { a: { type: actions.DATA_WITH_DEBOUNCE_FETCH } });

    const effect = new AppTimeEffect(new Actions(source));

    const expected = cold('a', { a: { type: actions.DATA_WITH_DEBOUNCE_FETCH_SUCCESS } });
    expect(effect.fetchDataWithDebounce$).toBeObservable(expected);
  });

  xit('can fetch data with debounce (fakeAsync)', fakeAsync(() => {
    const source = cold('a', { a: { type: actions.DATA_WITH_DEBOUNCE_FETCH } });

    const effect = new AppTimeEffect(new Actions(source));

    const expected = cold('a', { a: { type: actions.DATA_WITH_DEBOUNCE_FETCH_SUCCESS } });
    tick(200);
    expect(effect.fetchDataWithDebounce$).toBeObservable(expected);
  }));

  xit('can fetch data with debounce (mocking debounce)', () => {
    const source = cold('a', { a: { type: actions.DATA_WITH_DEBOUNCE_FETCH } });

    mockObservable();
    const effect = new AppTimeEffect(new Actions(source));

    const expected = cold('a', { a: { type: actions.DATA_WITH_DEBOUNCE_FETCH_SUCCESS } });
    expect(effect.fetchDataWithDebounce$).toBeObservable(expected);
  });

  xit('can fetch data with debounce (testScheduler)', () => {
    const scheduler = getTestScheduler();
    const source = scheduler.createHotObservable('a', { a: { type: actions.DATA_WITH_DEBOUNCE_FETCH } });

    const effect = new AppTimeEffect(new Actions(source));

    scheduler.expectObservable(effect.fetchDataWithDebounce$).toBe('a', { a: { type: actions.DATA_WITH_DEBOUNCE_FETCH_SUCCESS } });
    scheduler.flush();
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
