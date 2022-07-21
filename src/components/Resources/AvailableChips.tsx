import { useContext, useEffect, useState } from "react"
import { v4 } from "uuid";
import { appState, Context } from "../../context/Context";
import { ResourceCost } from "../../util/types";
import "./AvailableChips.css"

export default function AvailableChips() {
    const AppContext = useContext(Context);

    return (
        <div className="available-chips">
            {
                Object.keys(AppContext.gameboard.tradingResources).map((key: string) => {
                    return (
                        <div key={v4()} className={`chips-${key}`}>
                            <p>{key}: {AppContext.gameboard.tradingResources[key as keyof ResourceCost]}</p>
                        </div>
                    )
                })
            }
        </div>
    )
}