import { FullDeck } from "./types"

export default function cardTierToKey(tier: number): keyof FullDeck {
    switch (tier) {
        case 1:
            return "tierOne"
        case 2:
            return "tierTwo"
        case 3:
            return "tierThree"
        default:
            throw new Error("Invalid input to cardTierToKey");
    }
}