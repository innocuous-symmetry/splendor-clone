import { AppState, CardData, PlayerData, ResourceCost, setStateType, UIState } from "./types";

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
    liftCollapsed: (collapsed: boolean, tier: number) => void
}

export interface NobleProps extends StateProps {
    liftCollapsed: (collapsed: boolean) => void
}

export interface PlayerProps extends StateProps {
    player: PlayerData
}

export interface ResourceProps extends StateProps {
    liftSelection: (value: keyof ResourceCost) => void
}

export interface AllPlayersProps extends ResourceProps {
    UICollapse: UIState
}

export interface SelectionProps extends StateProps {
    UICollapse: UIState
}