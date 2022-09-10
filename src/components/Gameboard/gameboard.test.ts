import { expect, it, describe, vi } from 'vitest';
import initializeBoard from '../../util/setup/initializeBoard';
import { initialState } from '../../hooks/stateSetters';
import { AppState, setStateType } from '../../util/types';

describe('game config', () => {
    it('produces an initial state', () => {
        expect(1).toBe(1);
    })
})