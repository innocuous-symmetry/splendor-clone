import { useContext } from "react";
import { v4 } from "uuid";
import { Context } from "../../context/Context";
import { GemValue, PlayerData, ResourceCost } from "../../util/types"

interface PlayerProps {
    data: PlayerData
}

export default function Player({ data }: PlayerProps) {
    const AppContext = useContext(Context);

    let state: any;
    let setState: any;

    // const [state, setState] = useState({
    //     name: data.name,
    //     starter: data.starter,
    //     points: data.points,
    //     nobles: data.nobles,
    //     cards: data.cards,
    //     inventory: data.inventory
    // })

    // const buyCard = (cardData: CardData) => {
    //     let newCards = state.cards;
    //     newCards.push(cardData);
    //     setState({ ...state, cards: newCards })
    // }

    const getChips = (resource: string) => {
        AppContext.gameboard.tradingResources[resource as keyof ResourceCost] -= 1;
        console.log(AppContext);
    }

    return (
        <div className="player-ui" key={v4()}>
            <p>Name: {data.name}</p>
            <p>Score: {data.points}</p>
            <p>Is {data.starter || "not"} round starter</p>
            <button onClick={() => getChips('ruby')}>Get Chips</button>
            <div className="player-cards"></div>
            <div className="player-resources"></div>
        </div>
    )
}