import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';

import 'rxjs/add/operator/mapTo';

import * as actions from './app.actions';

@Injectable()
export class AppEffects {
    constructor(private actions$: Actions) { }

    @Effect()
    updateTextOnIncrement$ = this.actions$
        .ofType(actions.INCREMENT_ACTION)
        // Any additional processing we might want to do here
        .mapTo(({ type: actions.UPDATE_TEXT_ACTION }));
}
