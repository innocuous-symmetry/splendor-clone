import { AppState, ActionPrompts, GameActions, PlayerData, ResourceCost, StateProps } from "../../util/types";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { TurnOrderUtil } from "../../util/TurnOrderUtil";
import { v4 } from "uuid";

interface PlayerProps extends StateProps {
    player: PlayerData
    chipSelection: {
        selection: String[],
        setSelection: Dispatch<SetStateAction<Array<String>>>
    }
}

export default function Player({ player, state, setState, chipSelection }: PlayerProps) {
    const [actionPrompt, setActionPrompt] = useState(ActionPrompts[0]);
    const [actionType, setActionType] = useState<GameActions>();
    const [dynamic, setDynamic] = useState<PlayerData>();
    const { selection, setSelection } = chipSelection;

    useEffect(() => {
        setDynamic(state.players.find((element: PlayerData) => element.id === player.id));
    }, [state]);

    useEffect(() => {
        return;
    }, [selection, setSelection])

    useEffect(() => {
        switch (actionType) {
            case GameActions.GETCHIPS:
                console.log('get chips');
                getChips();
                setSelection([]);
                setActionType(GameActions.AWAIT);
                break;
            case GameActions.AWAIT:
                console.log('waiting for next action');
                break;
            default:
                break;
        }
    }, [actionType]);

    const getChips = () => {
        if (!dynamic?.turnActive) return;
        setActionPrompt(ActionPrompts[1]);

        if (selection.length < 3) return;
        
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
    }

    return (
        <div className="player-ui" key={v4()}>
            {/* Static Data */}
            <p>Name: {player.name}</p>
            <p>Score: {player.points}</p>
            <p>Is {player.starter || "not"} round starter</p>

            {/* Dynamic data from state */}
            <p>{dynamic?.turnActive ? actionPrompt : "..."}</p>

            <button onClick={() => setActionType(GameActions.GETCHIPS)}>Get Chips</button>

            <button onClick={()=>{}}>Buy a Card</button>
            <button onClick={()=>{}}>Reserve a Card</button>
            <div className="player-cards"></div>
            <div className="player-resources"></div>
        </div>
    )
}