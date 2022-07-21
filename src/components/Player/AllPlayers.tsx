import { useContext } from "react"
import { Context } from "../../context/Context"
import Player from "./Player";
import { v4 } from "uuid";
import "./AllPlayers.css"
import { PlayerData } from "../../util/types";

export default function AllPlayers({ AppContext }: any) {
    const { players } = AppContext;

    return (
        <div className="all-players">
            {
                players.map((player: PlayerData) => <Player key={v4()} data={player} />)
            }
        </div>
    )
}