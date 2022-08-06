import { Link } from "react-router-dom";
import { StateProps } from "../util/propTypes";

export default function ResumeGame({ state, setState }: StateProps) {
    return (
        <div className="resume-game App">
            <h2>Congrats! You've found an in-progress feature.</h2>
            <p>Check back in here later to enter a save game token to pick up a game from where you left off.</p>
            <p>In the meantime, click <Link to="/">here</Link> to head back home.</p>
        </div>
    )
}