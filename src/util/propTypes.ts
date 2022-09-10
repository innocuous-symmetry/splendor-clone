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
    liftCollapsed: (collapsed: boolean, tier?: number) => void
}

export interface NobleProps extends StateProps {
    liftCollapsed: (collapsed: boolean, tier?: number) => void
}

export interface PlayerProps extends StateProps {
    player: PlayerData
}

export interface ResourceProps extends StateProps {
    liftSelection: (value: keyof ResourceCost) => void
}

