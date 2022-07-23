import { GameActions, ResourceCost, StateProps } from "../../util/types";
import { v4 } from "uuid";
import "./AvailableChips.css"
import { Dispatch, SetStateAction, useEffect, useState } from "react";

interface AvailableChipsProps extends StateProps {
    chipSelection: {
        selection: String[],
        setSelection: Dispatch<SetStateAction<Array<String>>>
    }
}

export default function AvailableChips({ state, chipSelection }: AvailableChipsProps) {
    const { selection, setSelection } = chipSelection;

    const handleSelection = (key: string) => {
        let newValue = selection;

        if (newValue.length > 3) return;
        newValue.push(key);

        setSelection(newValue);
    }

    useEffect(() => {
        return;
    }, [state])

    useEffect(() => {
        switch (state.actions) {
            case (GameActions.GETCHIPS):
                console.log('get chips');
        }
    })

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