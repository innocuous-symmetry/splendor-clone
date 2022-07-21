import { useContext } from "react"
import { Context } from "../../context/Context"
import { v4 } from "uuid";
import "./AvailableChips.css"

export default function AvailableChips() {
    const { gameboard } = useContext(Context);

    return (
        <div className="available-chips">
        {
            Object.keys(gameboard.tradingResources).map((key: string) => {
                return (
                    <div key={v4()} className={`chips-${key}`}>
                        {/* @ts-ignore */}
                        <p>{key}: {gameboard.tradingResources[key]}</p>
                    </div>
                )
            })
        }
        </div>
    )
}