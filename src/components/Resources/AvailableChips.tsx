import { ResourceProps } from "../../util/propTypes";
import { ResourceCost } from "../../util/types";
import { v4 } from "uuid";
import "./AvailableChips.scss"

export default function AvailableChips({ state, liftSelection }: ResourceProps) {
    return (
        <div className="available-chips">
            {
                Object.keys(state.gameboard.tradingResources).map((key: string) => {
                    const typedKey = key as keyof ResourceCost;
                    return (
                        <div key={v4()} className={`chips-${key}`}>
                            <button
                                key={v4()}
                                value={key}
                                // @ts-ignore
                                disabled={state.gameboard.tradingResources[typedKey] <= 0}
                                onClick={() => liftSelection(typedKey)}
                                >
                                {key}: {state.gameboard.tradingResources[typedKey]}
                            </button>
                        </div>
                    )
                })
            }
        </div>
    )
}