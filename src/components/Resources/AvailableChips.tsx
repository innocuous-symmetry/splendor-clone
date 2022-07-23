import { ResourceCost, StateProps } from "../../util/types";
import { v4 } from "uuid";
import "./AvailableChips.css"
import { Dispatch, SetStateAction, useEffect } from "react";

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
        console.log(selection);
    }

    useEffect(() => {
        return;
    }, [state])

    useEffect(() => {
        console.log(selection);
    }, [selection, setSelection])

    return (
        <div className="available-chips">
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