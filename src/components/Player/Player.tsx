import { AppState, ActionPrompts, GameActions, PlayerData, ResourceCost, StateProps } from "../../util/types";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { TurnOrderUtil } from "../../util/TurnOrderUtil";
import useActionType from "../../util/useActionType";
import { v4 } from "uuid";

interface PlayerProps extends StateProps {
    player: PlayerData
    chipSelection: {
        selection: String[],
        setSelection: Dispatch<SetStateAction<Array<String>>>
    },
    liftFromChildren: any
}

export default function Player({ player, state, setState, chipSelection, liftFromChildren }: PlayerProps) {
    const [actionPrompt, setActionPrompt] = useState(ActionPrompts[0]);
    const [actionType, setActionType] = useState<GameActions>(GameActions.AWAIT);
    const [dynamic, setDynamic] = useState<PlayerData | undefined>(state.players.find((element: PlayerData) => element.id === player.id));
    const { selection, setSelection } = chipSelection;

    useEffect(() => {
        return;
    }, [selection, setSelection])

    useEffect(() => {
        const newState = useActionType(state, actionType);
        console.log(newState);

        switch (actionType) {
            case GameActions.GETCHIPS:
                setActionPrompt(ActionPrompts[1]);
                getChips();
                setSelection([]);
                break;
            case GameActions.BUYCARD:
                setActionPrompt(ActionPrompts[2]);
                break;
            case GameActions.RESERVECARD:
                setActionPrompt(ActionPrompts[3]);
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

        liftFromChildren(state);
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
            <button onClick={()=> setActionType(GameActions.BUYCARD)}>Buy a Card</button>
            <button onClick={()=> setActionType(GameActions.RESERVECARD)}>Reserve a Card</button>
            <div className="player-cards"></div>
            <div className="player-resources"></div>
        </div>
    )
}