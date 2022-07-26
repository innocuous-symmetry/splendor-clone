import { AppState, ResourceCost, StateProps } from "../../util/types";
import { useEffect } from "react";
import { v4 } from "uuid";
import "./AvailableChips.css"
import { setStateGetChips } from "../../util/stateSetters";
// import { validateChips } from "../Player/ActionMethods";

interface ResourceProps extends StateProps {
    liftSelection: (value: keyof ResourceCost) => void
}

export default function AvailableChips({ state, setState, liftSelection }: ResourceProps) {
    useEffect(() => {
        return;
    }, [state])

    return (
        <div className="available-chips">
            {
                Object.keys(state.gameboard.tradingResources).map((key: string | keyof ResourceCost) => {
                    return (
                        <div key={v4()} className={`chips-${key}`}>
                            <button
                                key={v4()}
                                value={key}
                                onClick={() => liftSelection(key as keyof ResourceCost)}
                                >
                                {key}: {state.gameboard.tradingResources[key as keyof ResourceCost]}
                            </button>
                        </div>
                    )
                })
            }
        </div>
    )
}