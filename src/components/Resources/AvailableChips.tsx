import { ResourceCost, StateProps } from "../../util/types";
import { v4 } from "uuid";
import "./AvailableChips.css"
import { useEffect, useState } from "react";

export default function AvailableChips({ state, setState }: StateProps) {
    const [selection, setSelection] = useState([]);

    useEffect(() => {
        return;
    }, [state])

    return (
        <div className="available-chips">
            {
                Object.keys(state.gameboard.tradingResources).map((key: string) => {
                    return (
                        <div key={v4()} className={`chips-${key}`}>
                            <button key={v4()} value={key} onClick={() => console.log(key)}>
                                {key}: {state.gameboard.tradingResources[key as keyof ResourceCost]}
                            </button>
                        </div>
                    )
                })
            }
        </div>
    )
}