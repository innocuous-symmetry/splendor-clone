import { AppState, PlayerData, ResourceCost, StateProps } from "../../util/types"
import { v4 } from "uuid";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { TurnOrderUtil } from "../../util/TurnOrderUtil";

interface PlayerProps extends StateProps {
    player: PlayerData
    chipSelection: {
        selection: String[],
        setSelection: Dispatch<SetStateAction<Array<String>>>
    }
}

enum ActionPrompts {
    "Choose your action type below:",
    "Make a selection of three different available resources, or two of the same.",
    "Choose a card to purchase above.",
    "Select any card above to reserve. You will also automatically take a gold chip.",
    "Select any card above to reserve. You have the maximum allowed number of chips, so you cannnot take a gold chip.",
    "It is not your turn."
}

export default function Player({ player, state, setState, chipSelection }: PlayerProps) {
    const [actionPrompt, setActionPrompt] = useState(ActionPrompts[0]);
    const [dynamic, setDynamic] = useState<PlayerData>();
    const { selection, setSelection } = chipSelection;

    useEffect(() => {
        setDynamic(state.players.find((element: PlayerData) => element.id === player.id));
    }, [state]);

    useEffect(() => {
        console.log(selection)
    }, [selection, setSelection])

    const getChips = () => {
        if (!dynamic?.turnActive) return;
        setActionPrompt(ActionPrompts[1]);

        console.log(selection);

        if (selection.length < 3) return;

        console.log('conditions met!');
        
        setState((prev: AppState) => {
            const { newPlayers, roundIncrement } = TurnOrderUtil(prev, dynamic);
            let newResources = prev.gameboard.tradingResources;

            for (let item of selection) {
                for (let [key, value] of Object.entries(newResources)) {
                    if (key === item) {
                        newResources[key as keyof ResourceCost] = value - 1;
                        break;
                    }
                }
            }
            
            return {
                ...prev,
                round: (roundIncrement ? prev.round + 1 : prev.round),
                players: newPlayers,
                gameboard: {
                    ...prev.gameboard,
                    tradingResources: newResources
                },
            }
        })

        setSelection([]);
    }

    return (
        <div className="player-ui" key={v4()}>
            {/* Static Data */}
            <p>Name: {player.name}</p>
            <p>Score: {player.points}</p>
            <p>Is {player.starter || "not"} round starter</p>

            {/* Dynamic data from state */}
            <p>{dynamic?.turnActive ? actionPrompt : "..."}</p>

            <button onClick={getChips}> {selection.length < 3 ? "Get Chips" : "Confirm"} </button>

            <button onClick={()=>{}}>Buy a Card</button>
            <button onClick={()=>{}}>Reserve a Card</button>
            <div className="player-cards"></div>
            <div className="player-resources"></div>
        </div>
    )
}