import { ResourceProps } from "../../util/propTypes";
import { ResourceCost } from "../../util/types";
import { v4 } from "uuid";
import "./AvailableChips.scss"

export default function AvailableChips({ state, liftSelection }: ResourceProps) {
    return (
        <div className={state.actions.getChips.active ? 'available-chips' : 'hidden'}>
            {
                Object.keys(state.gameboard.tradingResources).map((key: string) => {
                    const typedKey = key as keyof ResourceCost;

                    return (
                        <button
                            key={v4()}
                            value={key}
                            className={`chips-${key}`}
                            // @ts-ignore
                            disabled={state.gameboard.tradingResources[typedKey] <= 0}
                            onClick={() => liftSelection(typedKey)}
                            >
                            {key}: {state.gameboard.tradingResources[typedKey]}
                        </button>
                    )
                })
            }
        </div>
    )
}