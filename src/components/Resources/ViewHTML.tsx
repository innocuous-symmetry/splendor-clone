import { v4 } from "uuid";
import { useEffect, useState } from "react";
import { setStateGetChips } from "../../util/stateSetters";
import { StateProps } from "../../util/propTypes";
import { ResourceCost } from "../../util/types";
import { getChipsActions } from "../Player/ActionMethods";
import { useCurrentPlayer } from "../../util/useCurrentPlayer";
import { hasMaxChips } from "../Player/ActionMethods/getChipsActions";
const { getChips } = getChipsActions;

export const GetChipsHTML = ({ state, setState }: StateProps) => {
    const [prompt, setPrompt] = useState("");
    const currentPlayer = useCurrentPlayer(state);

    useEffect(() => {
        if (!state.actions.getChips.active) setPrompt("");
        if (state.actions.getChips.selection?.length === 0) {
            setPrompt("Please make a selection.");
        } else {
            setPrompt(`Your selection is ${state.actions.getChips.valid ? '' : "not"} valid`);
        }
    }, [state])

    return (
        <div className="selection-view">
            <h2>{currentPlayer?.name} has elected to collect resources!</h2> 
            <strong>{prompt}</strong>
            <div className="current-selections">
                {
                    state.actions.getChips.active &&
                    state.actions.getChips.selection?.map((each: keyof ResourceCost) => <p key={v4()}>{each}</p>)
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

export const ReserveCardHTML = ({ state, setState }: StateProps) => {
    const [takeGold, setTakeGold] = useState("");
    const currentPlayer = useCurrentPlayer(state);

    useEffect(() => {

    })

    return (
        <div className="selection-view">
            <h2>{currentPlayer?.name} has elected to reserve a card!</h2>
            <strong>Please make your selection above.</strong>
            { !hasMaxChips(currentPlayer) && (
                <div className="take-gold">
                    <p>Take a gold chip with your card? {takeGold}</p>
                    <label htmlFor="take-gold-yes">Yes</label>
                    <input
                        id="take-gold-yes"
                        value="Yes"
                        checked={takeGold === "Yes"}
                        onChange={() => setTakeGold("Yes")}
                        type="radio"
                    >
                    </input>

                    <label htmlFor="take-gold-no">No</label>
                    <input
                        id="take-gold-no"
                        value="No"
                        checked={takeGold === "No"}
                        onChange={() => setTakeGold("No")}
                        type="radio">
                    </input>
                </div>
            )}
        </div>
    )
}