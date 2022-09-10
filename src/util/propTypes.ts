import { AppState, CardData, PlayerData, ResourceCost, SetActionType, setStateType } from "./types";

export interface StateProps {
    state: AppState,
    setState: setStateType
}

export interface CardProps extends StateProps {
    data: CardData
    reserved?: boolean
    collapsed?: boolean
}

export interface CardRowProps extends StateProps {
    tier: number
}

export interface PlayerProps extends StateProps {
    player: PlayerData
}

export interface ResourceProps extends StateProps {
    liftSelection: (value: keyof ResourceCost) => void
}

