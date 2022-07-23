import { GameActions, ResourceCost, StateProps } from "../../util/types";
import { v4 } from "uuid";
import "./AvailableChips.css"
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import useActionStatus from "../../util/useActionStatus";

interface AvailableChipsProps extends StateProps {
    liftFromChildren: any,
    chipSelection: {
        selection: String[],
        setSelection: Dispatch<SetStateAction<Array<String>>>
    }
}

export default function AvailableChips({ state, chipSelection, liftFromChildren }: AvailableChipsProps) {
    const { selection, setSelection } = chipSelection;

    const handleSelection = (key: string) => {
        console.log(key)
        console.log(state);

        if (selection.length > 3) return;

        setSelection((prev) => {
            let newValue = prev;
            newValue.push(key);
            return newValue;
        })
    }

    useEffect(() => {
        useActionStatus(state);
    }, [state])

    return (
        <div className="available-chips">

            <div className="current-selection">
                <strong>Selection:</strong>
                { selection.map((each) => <p key={v4()}>{each}</p>) }
            </div>

            {
                Object.keys(state.gameboard.tradingResources).map((key: string) => {
                    return (
                        <div key={v4()} className={`chips-${key}`}>
                            <button
                                onClick={() => handleSelection(key)}
                                value={key}>
                                {key}: {state.gameboard.tradingResources[key as keyof ResourceCost]}
                            </button>
                        </div>
                    )
                })
            }

        </div>
    )
}