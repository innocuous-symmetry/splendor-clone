import { v4 } from 'uuid';
import { CardProps } from '../../util/propTypes';
import { ResourceCost } from '../../util/types';
import { buyCardActions } from '../Player/ActionMethods';
const { buyCard, tooExpensive } = buyCardActions;

export default function Card({ data, state, setState }: CardProps) {
    return (
        <div className={`card`}>
            <div className="top-row">
                <p>Counts as: {data.gemValue}</p>
                <p>Point value: {data.points || 0}</p>
                <p>Cost:</p>
                {
                    Object.keys(data.resourceCost).map((key: keyof ResourceCost | string) => {
                        // @ts-ignore
                        return (data.resourceCost[key as keyof ResourceCost] > 0) && <p key={v4()}>{key}: {data.resourceCost[key as keyof ResourceCost]}</p>
                    })
                }
                { state.actions.buyCard.active &&
                    <button
                        onClick={() => buyCard(data, state, setState)}
                        disabled={tooExpensive(data, state)}
                        >
                        Buy This Card
                    </button>
                }
            </div>
        </div>
    )
}