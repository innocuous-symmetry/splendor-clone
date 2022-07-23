import { ResourceCost, StateProps } from "../../util/types";
import { v4 } from "uuid";
import "./AvailableChips.css"
import { useEffect } from "react";

export default function AvailableChips({ state }: StateProps) {
    useEffect(() => {
        return;
    }, [state])

    return (
        <div className="available-chips">
            {
                Object.keys(state.gameboard.tradingResources).map((key: string) => {
                    return (
                        <div key={v4()} className={`chips-${key}`}>
                            <p>{key}: {state.gameboard.tradingResources[key as keyof ResourceCost]}</p>
                        </div>
                    )
                })
            }
        </div>
    )
}