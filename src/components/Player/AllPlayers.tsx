import { useContext } from "react"
import { Context } from "../../context/Context"
import Player from "./Player";
import { v4 } from "uuid";
import "./AllPlayers.css"

export default function AllPlayers() {
    const { players } = useContext(Context);

    return (
        <div className="all-players">
            {
                players.map((player) => <Player key={v4()} data={player} />)
            }
        </div>
    )
}