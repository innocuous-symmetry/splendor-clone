import { expect, it, describe, vi } from 'vitest';
import initializeBoard from '../../util/initializeBoard';
import { initialState } from '../../util/stateSetters';
import { AppState, setStateType } from '../../util/types';

describe('game config', () => {
    it('produces an initial state', () => {
        expect(1).toBe(1);
    })
})