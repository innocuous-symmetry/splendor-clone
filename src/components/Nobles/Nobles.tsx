import { v4 } from "uuid";
import { NobleData, ResourceCost } from "../../util/types";
import { StateProps } from "../../util/propTypes";
import "../Nobles/Nobles.scss"

export default function Nobles({ state }: StateProps) {
    if (!state.gameboard.nobles.length) {
        return (
            <div className="nobles-panel">
                <strong>NOBLES</strong>
                <p>All nobles have been acquired!</p>
            </div>
        )
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