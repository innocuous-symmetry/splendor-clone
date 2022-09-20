// framework
import { useEffect, useMemo, useState } from "react";
import { v4 } from "uuid";

// util
import { shouldRightSideCollapse } from "../../util/mechanics/shouldRightSideCollapse";
import { AllPlayersProps } from "../../util/propTypes";
import { useCurrentPlayer } from "../../hooks/useCurrentPlayer";
import { defaultUIState } from "../../util/setup/defaultUIState";
import { UIState } from "../../util/types";

// components
import AvailableChips from "../Resources/AvailableChips";
import SelectionView from "../Resources/SelectionView";
import Player from "./Player";
import "./AllPlayers.scss"

export default function AllPlayers({ state, setState, liftSelection, UICollapse, setUICollapse, liftCollapsed }: AllPlayersProps) {
    const [playerView, setPlayerView] = useState<JSX.Element>();
    const [collapseClass, setCollapseClass] = useState("all-players");

    const collapseAll = () => {
        liftCollapsed(true);
        liftCollapsed(true, 3);
        liftCollapsed(true, 2);
        liftCollapsed(true, 1);
            // let value = UICollapse[each as keyof UIState];
            // if (each === "playerUICollapsed") {
            //     continue;
            // } else if (each === "noblesCollapsed") {
            //     console.log(each);
            //     liftCollapsed(value);
            // } else {
            //     console.log(each, value);
            //     switch (each) {
            //         case "tierThreeCollapsed":
            //             liftCollapsed(value, 3);
            //             break;
            //         case "tierTwoCollapsed":
            //             liftCollapsed(value, 2);
            //             break;
            //         case "tierOneCollapsed":
            //             liftCollapsed(value, 1);
            //             break;
            //         default: break;
            //     }
            // }
    }

    const allowCollapseAll = useMemo(() => {
        for (let each of Object.keys(UICollapse)) {
            if (each === "playerUICollapsed") continue;
            if (!UICollapse[each as keyof UIState]) return true;
        }
        return false;
    }, [UICollapse]);

    useEffect(() => {
        const currentPlayer = useCurrentPlayer(state);
        if (!currentPlayer) return;
        setPlayerView(<Player key={v4()} player={currentPlayer} state={state} setState={setState} />);
    }, [state]);

    useEffect(() => {
        setCollapseClass( shouldRightSideCollapse(UICollapse) ? "all-players-mini" : "all-players" );
    }, [UICollapse]);

    return (
        <div className={collapseClass}>
            { allowCollapseAll && <button onClick={collapseAll}>Collapse All</button> }
            <SelectionView state={state} setState={setState} UICollapse={UICollapse} />
            <AvailableChips state={state} setState={setState} liftSelection={liftSelection} />
            { playerView }
        </div>
    )
}