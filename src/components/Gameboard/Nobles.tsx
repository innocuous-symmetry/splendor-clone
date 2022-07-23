import { useEffect } from "react";
import { v4 } from "uuid";
import { NobleData, ResourceCost, StateProps } from "../../util/types";
import "./Nobles.css"

export default function Nobles({ state, setState }: StateProps) {
    const removeNoble = (noble: NobleData) => {
        console.log(noble);
        setState((prev) => {
            return {
                ...prev,
                gameboard: {
                    ...prev.gameboard,
                    nobles: prev.gameboard.nobles.filter((each) => each.nobleid !== noble.nobleid)
                }
            }
        })
    }

    return (
        <div className="nobles-panel">
            <strong>NOBLES</strong>
            <div className="all-nobles">
                {
                state && state.gameboard.nobles.map((noble: NobleData) => {
                    return (
                        <div className="noble-card" key={v4()}>
                            <p>Points: {noble.points}</p>
                            <p>Cost:</p>
                            {
                                Object.keys(noble.resourceCost).map((each) => {
                                    // @ts-ignore
                                    return (noble.resourceCost[each as keyof ResourceCost] > 0) && <p key={v4()}>{each}: {noble.resourceCost[each as keyof ResourceCost]}</p>
                                })
                            }
                        </div>
                    )
                })
                }
            </div>
        </div>
    )
}