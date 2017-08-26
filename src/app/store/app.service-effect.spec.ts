import { Actions } from '@ngrx/effects';
import { cold } from 'jasmine-marbles';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';

import { AppServiceEffect } from './app.service-effect';
import * as actions from './app.actions';

describe('testing app service effects', () => {
  it('can fetch app data', () => {
    const source = cold('a', { a: { type: actions.DATA_FETCH } });
    const service = createServiceStub({});
    const effects = new AppServiceEffect(new Actions(source), service);

    const expected = cold('a', { a: { type: actions.DATA_FETCH_SUCCESS } });
    expect(effects.fetchAppData$).toBeObservable(expected);
  });

  it('can handle fetching data errors', () => {
    const source = cold('a', { a: { type: actions.DATA_FETCH } });
    const service = createServiceStub(new Error('Error occurred!'));
    const effects = new AppServiceEffect(new Actions(source), service);

    const expected = cold('a', { a: { type: actions.DATA_FETCH_FAILED } });
    expect(effects.fetchAppData$).toBeObservable(expected);
  });

  function createServiceStub(response: any) {
    const service = jasmine.createSpyObj('service', [ 'getDummyData' ]);

    const isError = response instanceof Error;
    const serviceResponse = isError ? Observable.throw(response) : Observable.of(response);

    service.getDummyData.and.returnValue(serviceResponse);

    return service;
  }
});
