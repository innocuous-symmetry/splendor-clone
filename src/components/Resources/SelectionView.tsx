import { useEffect, useState } from "react";
import { StateProps } from "../../util/propTypes";
import { GetChipsHTML, ReserveCardHTML } from "./ViewHTML";

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
                    return <strong>Please make your selection above:</strong>;
                case (actionTypes[2].active):
                    return <ReserveCardHTML state={state} setState={setState} />;
                default:
                    return <></>;
            }
        })
    }, [state])

    return view
}