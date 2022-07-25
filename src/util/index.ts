import initializeBoard from './initializeBoard';
import * as stateSetters from './stateSetters';
import { turnOrderUtil } from './turnOrderUtil';
import * as APPTYPES from './types';
import { useCurrentPlayer } from './useCurrentPlayer';

export default class UTIL {
    initializeBoard = initializeBoard
    turnOrderUtil = turnOrderUtil
    useCurrentPlayer = useCurrentPlayer
    stateSetters = stateSetters
    APPTYPES = APPTYPES
}