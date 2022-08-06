import { v4 } from "uuid";
import { NobleData, PlayerData, ResourceCost } from "../../util/types";
import { StateProps } from "../../util/propTypes";
import "./Nobles.css"
import getTotalBuyingPower from "../../util/getTotalBuyingPower";
import { useCurrentPlayer } from "../../util/useCurrentPlayer";
import { useEffect } from "react";

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

    const canPickUpNoble = (player: PlayerData, noble: NobleData): boolean => {
        const nobleCost = noble.resourceCost;

        const totalBuyingPower = getTotalBuyingPower(player);
        const playerInventory = player.inventory;

        
        for (let key of Object.keys(totalBuyingPower)) {
            const typedKey = key as keyof ResourceCost;
            let coinValue = playerInventory[typedKey] || 0;

            if (!noble.resourceCost[typedKey]) continue;
            // @ts-ignore
            if ((totalBuyingPower[typedKey] - coinValue) >= noble.resourceCost[typedKey]) {
                continue;
            } else {
                return false;
            }
        }

        return true;
    }

    // useEffect(() => {
    //     const currentPlayer = useCurrentPlayer(state);
    //     if (!currentPlayer) return;

    //     for (let each of state.gameboard.nobles) {
    //         console.log(`${currentPlayer.name} can pick up noble ${state.gameboard.nobles.indexOf(each) + 1}? ${canPickUpNoble(currentPlayer, each) ? "yes" : "no"}`)
    //     }
    // }, [state])

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