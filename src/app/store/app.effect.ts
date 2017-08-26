import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';

import 'rxjs/add/operator/map';

import * as actions from './app.actions';

@Injectable()
export class AppEffects {
    constructor(private actions$: Actions) { }

    @Effect()
    updateTextOnIncrement$ = this.actions$
        .ofType(actions.INCREMENT_ACTION)
        .map(_ => ({ type: actions.UPDATE_TEXT_ACTION }));
}
