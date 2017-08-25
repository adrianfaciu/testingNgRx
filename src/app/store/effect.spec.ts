import { Actions } from '@ngrx/effects';
import { hot } from 'jasmine-marbles';

import { AppEffects } from './effect';
import * as actions from './actions';

describe('testing effects', () => {
    it('basic test', () => {
        const source = hot('a', { a: { type: actions.INCREMENT_ACTION } });
        const effects = new AppEffects(new Actions(source));

        const expected = hot('a', { a: { type: actions.UPDATE_TEXT_ACTION } });
        expect(effects.updateTextOnIncrement$).toBeObservable(expected);
    });
});
