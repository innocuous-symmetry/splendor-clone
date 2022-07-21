import { useContext, useEffect } from "react";
import { v4 } from "uuid";
import { Context } from "../../context/Context";
import "./Nobles.css"

export default function Nobles() {
    const { gameboard } = useContext(Context);
    
    useEffect(() => {
        console.log(gameboard);
    }, [gameboard])

    return (
        <div className="nobles-panel">
            <strong>NOBLES</strong>
            <div className="all-nobles">
                {
                gameboard.nobles.map((noble) => {
                    return (
                        <div className="noble-card" key={v4()}>
                            <p>Points: {noble.points}</p>
                            <p>Cost:</p>
                            {
                                Object.keys(noble.resourceCost).map((each) => {
                                    // @ts-ignore
                                    return (noble.resourceCost[each] > 0) && <p>{each}: {noble.resourceCost[each]}</p>
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