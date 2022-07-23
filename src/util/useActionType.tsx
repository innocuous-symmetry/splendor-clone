import { ActionTypes, AppState, GameActions } from "./types";

export default function useActionType(state: AppState, action: GameActions) {
    let newActions: ActionTypes = {
        getChips: { active: false },
        buyCard: { active: false },
        reserveCard: { active: false }
    }

    switch (action) {
        case (GameActions.GETCHIPS):
            newActions = {
                ...newActions,
                getChips: {
                    active: true,
                    chips: [],
                    valid: false
                }
            }
            break;
        case (GameActions.BUYCARD):
            newActions = {
                ...newActions,
                buyCard: {
                    active: true,
                    card: null
                }
            }
            break;
        case (GameActions.RESERVECARD):
            newActions = {
                ...newActions,
                reserveCard: {
                    active: true,
                    card: null,
                    includeGold: false
                }
            }
            break;
        case (GameActions.AWAIT):
            break;
        default:
            break;
    }

    return {
        ...state,
        actions: newActions
    }
}