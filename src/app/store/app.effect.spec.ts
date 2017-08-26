import { Actions } from '@ngrx/effects';
import { cold } from 'jasmine-marbles';

import { AppEffects } from './app.effect';
import * as actions from './app.actions';

describe('testing app effects', () => {
    it('basic test', () => {
        const source = cold('a', { a: { type: actions.INCREMENT_ACTION } });
        const effects = new AppEffects(new Actions(source));

        const expected = cold('a', { a: { type: actions.UPDATE_TEXT_ACTION } });
        expect(effects.updateTextOnIncrement$).toBeObservable(expected);
    });
});
