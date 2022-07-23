import { AppState } from "./types";

export default function useActionStatus(state: AppState) {
    switch (true) {
        case (state.actions.getChips.active):
            console.log('get chips active');
            break;
        case (state.actions.buyCard.active):
            console.log('buy card active');
            break;
        case (state.actions.reserveCard.active):
            console.log("reserve card active")
            break;
        default:
            break;
    }
}