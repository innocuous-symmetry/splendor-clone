import { ResourceCost, StateProps } from "../../util/types";
import { useEffect } from "react";
import { v4 } from "uuid";
import "./AvailableChips.css"
import { setStateGetChips } from "../../util/stateSetters";

interface ResourceProps extends StateProps {
    liftSelection: (value: keyof ResourceCost) => void
}

export default function AvailableChips({ state, setState, liftSelection }: ResourceProps) {
    useEffect(() => {
        return;
    }, [state])

    return (
        <div className="available-chips">
            {state.actions.getChips.active && <p>Your selection is {state.actions.getChips.valid || "not"} valid</p>}
            {
                state.actions.getChips.active &&
                state.actions.getChips.selection?.map((each) => <p key={v4()}>{each}</p>)
            }
            {
                Object.keys(state.gameboard.tradingResources).map((key: string | keyof ResourceCost) => {
                    return (
                        <div key={v4()} className={`chips-${key}`}>
                            <button key={v4()} value={key} onClick={() => liftSelection(key as keyof ResourceCost)}>
                                {key}: {state.gameboard.tradingResources[key as keyof ResourceCost]}
                            </button>
                        </div>
                    )
                })
            }
            <button key={v4()} onClick={() => setState((prev) => setStateGetChips(prev))}>Reset Selection</button>
        </div>
    )
}