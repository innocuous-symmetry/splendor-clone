import { useState } from "react";
import { CardData, GemValue, NobleData, PlayerData } from "../../util/types";

interface PlayerProps {
    data: PlayerData
}

export default function Player({ data }: PlayerProps) {
    const [state, setState] = useState({
        name: data.name,
        starter: data.starter,
        points: data.points,
        nobles: data.nobles,
        cards: data.cards,
        inventory: data.inventory
    })

    const buyCard = (cardData: CardData) => {
        let newCards = state.cards;
        newCards.push(cardData);
        setState({ ...state, cards: newCards })
    }

    const getChips = (payload: (string | GemValue)[]) => {
        let newInventory = state.inventory;
        for (let value of payload) {
            for (let key in newInventory) {
                if (value === key) {
                    // @ts-ignore
                    newInventory[value] += 1;
                }
            }
        }

        setState({ ...state, inventory: newInventory });
    }

    return (
        <div className="player-ui">
            <p>Name: {data.name}</p>
            <p>Score: {data.points}</p>
        </div>
    )
}