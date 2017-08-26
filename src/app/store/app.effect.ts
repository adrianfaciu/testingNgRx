import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';

import 'rxjs/add/operator/map';

import { INCREMENT_ACTION, UPDATE_TEXT_ACTION } from './app.actions';

@Injectable()
export class AppEffects {
    constructor(private actions$: Actions) { }

    @Effect()
    updateTextOnIncrement$ = this.actions$
        .ofType(INCREMENT_ACTION)
        .map(_ => ({ type: UPDATE_TEXT_ACTION }));
}
