import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';

import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mapTo';
import 'rxjs/add/operator/catch';

import * as actions from './app.actions';
import { AppService } from '../services/app.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AppServiceEffect {
  constructor(private actions$: Actions,
              private appService: AppService,
            ) { }

  @Effect()
  fetchAppData$ = this.actions$
    .ofType(actions.DATA_FETCH)
    .switchMap(_ => this.appService
      .getDummyData()
      .mapTo(({ type: actions.DATA_FETCH_SUCCESS }))  // Usually here we also pass a payload to the action
      .catch(() =>  Observable.of({ type: actions.DATA_FETCH_FAILED }))
    );
}
