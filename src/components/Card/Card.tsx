import { v4 } from 'uuid';
import { CardProps } from '../../util/propTypes';
import { CardData, PlayerCards, ResourceCost } from '../../util/types';
import { useCurrentPlayer } from '../../hooks/useCurrentPlayer';
import { buyCardActions } from '../Player/ActionMethods';
import { hasMaxReserved, reserveCard } from '../Player/ActionMethods/reserveCardActions';
const { buyCard, tooExpensive } = buyCardActions;

export default function Card({ data, state, setState, reserved = false, collapsed = false }: CardProps) {
    const currentPlayer = useCurrentPlayer(state);
    if (!data || !currentPlayer) return <div className="card"></div>;

    const purchaseDisabled = (): boolean => {
        // TO DO: check whether a card belongs to the current player,
        // if card is tagged as reserved
        return tooExpensive(data, state);
    }

    return (
        <div className='card' key={v4()}>
            { collapsed ? <div className={`img-placeholder-${data.gemValue}`}></div> : <img src={data.image} loading="lazy" /> }
            <div className={reserved ? `foreground-${data.gemValue}` : 'foreground'}>
                <section className="card-top-section">
                    <p>{data.gemValue.toUpperCase()}</p>
                    <div className="total-card-cost">
                    {
                        Object.keys(data.resourceCost).map((key: keyof ResourceCost | string) => {
                            // @ts-ignore
                            return (data.resourceCost[key as keyof ResourceCost] > 0) && (
                                <p key={v4()} className={`card-cost-${key}`}>
                                    {data.resourceCost[key as keyof ResourceCost]}
                                </p>
                            )
                        })
                    }
                    </div>
                    { (data.points && data.points > 0) ? <p>{data.points} {data.points === 1 ? 'point' : 'points'}</p> : null }
                </section>

                {
                    (state.actions.buyCard.active || state.actions.reserveCard.active) && (
                        <section className="card-action-section">
                            { state.actions.buyCard.active &&
                                <button
                                    onClick={() => buyCard(state, setState, data)}
                                    disabled={purchaseDisabled()}>
                                    Buy This Card
                                </button>
                            }
                            { !reserved && state.actions.reserveCard.active &&
                                <button
                                    onClick={() => reserveCard(state, setState, data)}
                                    disabled={hasMaxReserved(currentPlayer)}>
                                    Reserve This Card
                                </button>
                            }
                        </section>
                    )
                }
            </div>
        </div>
    )
}