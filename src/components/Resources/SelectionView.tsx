import { v4 } from "uuid";
import { useEffect, useState } from "react";
import { ResourceCost, StateProps } from "../../util/types";
import { setStateGetChips } from "../../util/stateSetters";
import { GetChipsHTML } from "./ViewHTML";

export default function SelectionView({ state, setState }: StateProps) {
    const actionTypes = [
        state.actions.getChips,
        state.actions.buyCard,
        state.actions.reserveCard
    ]
    const [view, setView] = useState(<></>);

    useEffect(() => {
        setView(() => {
            switch (true) {
                case (actionTypes[0].active):
                    return <GetChipsHTML state={state} setState={setState} />
                case (actionTypes[1].active):
                    return (
                        <>
                        {actionTypes[1].active && <strong>Your selection is {actionTypes[1].valid || "not"} valid</strong>}
                        <p>Card will display here</p>
                        </>
                    )
                default:
                    return <></>;
            }
        })
    }, [state])

    return view
}