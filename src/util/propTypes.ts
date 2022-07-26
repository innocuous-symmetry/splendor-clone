import { AppState, CardData, PlayerData, ResourceCost, SetActionType, setStateType } from "./types";

export interface StateProps {
    state: AppState,
    setState: setStateType
}

export interface CardProps extends StateProps {
    data: CardData
}

export interface CardRowProps extends StateProps {
    tier: number
}

export interface AllPlayersProps extends StateProps {
    setActionState: (value: SetActionType, player?: PlayerData) => void
}

export interface PlayerProps extends AllPlayersProps {
    player: PlayerData
}

export interface ResourceProps extends StateProps {
    liftSelection: (value: keyof ResourceCost) => void
}

