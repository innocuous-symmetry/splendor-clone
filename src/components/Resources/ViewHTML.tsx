import { useEffect, useState } from "react";
import { v4 } from "uuid";
import { setStateGetChips, setStateReserveCard, setStateReservePlusGold } from "../../hooks/stateSetters";
import { useCurrentPlayer } from "../../hooks/useCurrentPlayer";
import { shouldRightSideCollapse } from "../../util/mechanics/shouldRightSideCollapse";
import { SelectionProps } from "../../util/propTypes";
import { ResourceCost } from "../../util/types";
import { getChipsActions } from "../Player/ActionMethods";
import { hasMaxChips } from "../Player/ActionMethods/getChipsActions";
const { getChips } = getChipsActions;

export const GetChipsHTML = ({ state, setState, UICollapse }: SelectionProps) => {
    const [prompt, setPrompt] = useState("");
    const [style, setStyle] = useState("");
    const currentPlayer = useCurrentPlayer(state);

    useEffect(() => {
        setStyle(shouldRightSideCollapse(UICollapse) ? "selection-view-mini" : "selection-view");
    }, [UICollapse]);

    useEffect(() => {
        if (!state.actions.getChips.active) setPrompt("");
        if (state.actions.getChips.selection?.length === 0) {
            setPrompt("Please make a selection.");
        } else {
            setPrompt(`Your selection is ${state.actions.getChips.valid ? '' : "not"} valid`);
        }
    }, [state])

    return (
        <div className={style}>
            <h2>{currentPlayer?.name} has elected to collect resources!</h2> 
            <strong>{prompt}</strong>
            <div className="current-selections">
                {
                    state.actions.getChips.active &&
                    state.actions.getChips.selection?.map((each: keyof ResourceCost) => <p className={`selection-value-${each}`} key={v4()}>{each[0].toUpperCase()}</p>)
                }
            </div>
            {
                state.actions.getChips.valid ?
                <button onClick={() => getChips(state, setState)}>Confirm Selection</button>
                    :
                <button key={v4()} onClick={() => setState((prev) => setStateGetChips(prev))}>Reset Selection</button>
            }
        </div>
    )
}

export const ReserveCardHTML = ({ state, setState, UICollapse }: SelectionProps) => {
    const [takeGold, setTakeGold] = useState(false);
    const [style, setStyle] = useState("");
    const currentPlayer = useCurrentPlayer(state);

    useEffect(() => {
        setStyle(shouldRightSideCollapse(UICollapse) ? "selection-view-mini" : "selection-view");
    }, [UICollapse]);

    useEffect(() => {
        switch (takeGold) {
            case true:
                setState((prev) => setStateReservePlusGold(prev));
                break;
            case false:
                setState((prev) => setStateReserveCard(prev));
                break;
            default:
                break;
        }
    }, [takeGold]);

    return (
        <div className={style}>
            <h2>{currentPlayer?.name} has elected to reserve a card!</h2>
            <strong>Please make your selection above.</strong>
            { !hasMaxChips(currentPlayer) && (
                <div className="take-gold">
                    <p>Take a gold chip with your card? {takeGold}</p>
                    <label htmlFor="take-gold-yes">Yes</label>
                    <input
                        id="take-gold-yes"
                        value="Yes"
                        checked={takeGold}
                        onChange={() => setTakeGold(true)}
                        type="radio"
                    >
                    </input>

                    <label htmlFor="take-gold-no">No</label>
                    <input
                        id="take-gold-no"
                        value="No"
                        checked={!takeGold}
                        onChange={() => setTakeGold(false)}
                        type="radio">
                    </input>
                </div>
            )}
        </div>
    )
}