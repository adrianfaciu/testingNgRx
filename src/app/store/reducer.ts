import { Action } from '@ngrx/store';
import { INCREMENT_ACTION, UPDATE_TEXT_ACTION } from './actions';

export interface AppState {
    count: number;
    text: string;
}

export const INITIAL_STATE: AppState = {
    count: 0,
    text: '',
};

export function reducer(state = INITIAL_STATE, action: Action) {
    switch (action.type) {
        case INCREMENT_ACTION:
            return {
                ...state,
                count: state.count++,
            };
        case UPDATE_TEXT_ACTION:
            return {
                ...state,
                text: 'Count value is: ' + state.count,
            };
        default:
            return state;
    }
}
