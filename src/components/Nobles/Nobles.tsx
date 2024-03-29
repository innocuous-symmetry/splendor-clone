import { v4 } from "uuid";
import { NobleData, ResourceCost } from "../../util/types";
import { NobleProps } from "../../util/propTypes";
import "../Nobles/Nobles.scss"
import { useEffect, useState } from "react";

export default function Nobles({ state, liftCollapsed }: NobleProps) {
    const [collapsed, setCollapsed] = useState(true);

    useEffect(() => {
        liftCollapsed(collapsed);
    }, [collapsed]);

    if (!state.gameboard.nobles.length) {
        return (
            <div className="nobles-panel">
                <strong>NOBLES</strong>
                <p>All nobles have been acquired!</p>
            </div>
        )
    }
    
    return (
        <div className={`nobles-panel ${collapsed && 'collapsed'}`}>
            <div className="nobles-topbar">
                <strong className="nobles-header">Nobles</strong>
                <button onClick={() => setCollapsed(!collapsed)}>{collapsed ? "Show" : "Hide"}</button>
            </div>
            <div className={collapsed ? "hidden" : "all-nobles"}>
                {
                state && state.gameboard.nobles.map((noble: NobleData) => {
                    return (
                        <div className="noble-card" key={v4()}>
                            <p>Cost:</p>
                            <div className="mapped-noble-costs">
                            {
                                Object.keys(noble.resourceCost).map((each) => {
                                    // @ts-ignore
                                    return (noble.resourceCost[each as keyof ResourceCost] > 0) && (
                                        <p key={v4()} className={`noble-cost-${each}`}>
                                            {noble.resourceCost[each as keyof ResourceCost]}
                                        </p>
                                    )
                                })
                            }
                            </div>
                        </div>
                    )
                })
                }
            </div>
        </div>
    )
}