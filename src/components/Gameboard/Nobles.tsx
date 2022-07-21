import { v4 } from "uuid";
import { NobleData, ResourceCost } from "../../util/types";
import "./Nobles.css"

export default function Nobles({ AppContext }: any) {
    const { gameboard } = AppContext;

    return (
        <div className="nobles-panel">
            <strong>NOBLES</strong>
            <div className="all-nobles">
                {
                gameboard.nobles && gameboard.nobles.map((noble: NobleData) => {
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
                }) || <p>Nobles not found. Please wait...</p>
                }
            </div>
        </div>
    )
}