import { v4 } from "uuid";
import { useEffect, useState } from "react";
import { setStateGetChips } from "../../util/stateSetters";
import { ResourceCost, StateProps } from "../../util/types";
import { getChipsActions } from "../Player/ActionMethods";
const { getChips } = getChipsActions;

export const GetChipsHTML = ({ state, setState }: StateProps) => {
    const [prompt, setPrompt] = useState("");

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