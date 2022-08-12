import { setStateAwaitAction, setStateBuyCard, setStateGetChips, setStateReserveCard } from "../../hooks/stateSetters";
import { useEffect, useState } from "react";
import { PlayerProps } from "../../util/propTypes";
import { CardData, PlayerData } from "../../util/types"
import { hasMaxReserved } from "./ActionMethods/reserveCardActions";
import { hasMaxChips } from "./ActionMethods/getChipsActions";
import { v4 } from "uuid";

export default function Player({ player, state, setState }: PlayerProps) {
    const [dynamic, setDynamic] = useState<PlayerData>();
    const [cardView, setCardView] = useState(<p>Cards:</p>);
    const [reservedView, setReservedView] = useState(<p>Reserved cards:</p>);

    useEffect(() => {
        setDynamic(state.players.find((element: PlayerData) => element.id === player.id))
    }, [state]);

    useEffect(() => {
        dynamic && setCardView(
            <>
            <p>Cards:</p>
            {
                dynamic.cards.map((data: CardData) => {
                    return (
                        <div key={v4()} className="mini-card" style={{backgroundColor: 'white'}}>
                            <p>{data.gemValue} card</p>
                            <p>{data.points + " points" || null}</p>
                            {
                                Object.entries(data.resourceCost).map(([key, value]) => {
                                    return value > 0 && <p key={v4()}>{key}: {value}</p>
                                })
                            }
                        </div>
                    )
                })
            }
            </>
        )

        dynamic && setReservedView(
            <>
            <p>Reserved cards:</p>
            {
                dynamic.reservedCards?.map((data: CardData) => {
                    return (
                        <div key={v4()} className="mini-card" id={`${dynamic.name}-player-ui`} style={{backgroundColor: 'white'}}>
                            <p>{data.gemValue} cards</p>
                            <p>{data.points + " points" || null}</p>
                            {
                                Object.entries(data.resourceCost).map(([key, value]) => {
                                    return value > 0 && <p key={v4()}>{key}: {value}</p>
                                })
                            }
                        </div>
                    )
                })
            }
            </>
        )
    }, [dynamic, setState])

    const handleClick = (actionSelection: number) => {
        switch (actionSelection) {
            case 0:
                setState((prev) => setStateGetChips(prev));
                break;
            case 1:
                setState((prev) => setStateBuyCard(prev));
                break;
            case 2:
                setState((prev) => setStateReserveCard(prev));
                break;
            default:
                setState((prev) => setStateAwaitAction(prev));
                break;
        }
    }

    return (
        <div className="player-ui" key={v4()}>
            {/* Static Data */}
            <section className="player-constants">
                <p>Name: {player.name}</p>
                <p>Is {player.starter || "not"} round starter</p>
            </section>

            {/* Dynamic data from state */}
            <section className="turn-and-action-based">
                <p>Score: {dynamic && dynamic.points}</p>
                <p>{dynamic?.turnActive ? "It's your turn!" : "..."}</p>

                {/* Player actions */}
                <button
                    disabled={(dynamic && hasMaxChips(dynamic)) || (!dynamic?.turnActive)}
                    onClick={() => handleClick(0)}>
                        Get Chips
                </button>

                <button
                    disabled={!dynamic?.turnActive}
                    onClick={() => handleClick(1)}>
                        Buy Card
                </button>

                <button
                    disabled={(dynamic && hasMaxReserved(dynamic)) || (!dynamic?.turnActive)}
                    onClick={() => handleClick(2)}>
                        Reserve Card
                </button>

            </section>

            <section className="resources">
                <strong>{dynamic?.name}'s Resources</strong>

                <div className="player-chips">
                    <p>Chips:</p>
                    { dynamic && Object.entries(dynamic.inventory).map(([key,value]) => {
                        return value > 0 && <p key={v4()}>{key}: {value}</p>
                    })}
                </div>

                <div className="player-cards">
                    {dynamic && cardView}
                </div>

                <div className="reserved-cards">
                    {dynamic && reservedView}
                </div>
            </section>
        </div>
    )
}