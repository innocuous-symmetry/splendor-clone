import { PlayerData, ResourceCost } from "./types";

export default function getTotalBuyingPower(currentPlayer: PlayerData) {
    let totalBuyingPower = {
        ruby: 0,
        sapphire: 0,
        emerald: 0,
        diamond: 0,
        onyx: 0,
        gold: 0,
    }

    if (!currentPlayer) return totalBuyingPower;
    
    for (let [key,quantity] of Object.entries(currentPlayer.inventory)) {
        totalBuyingPower[key as keyof ResourceCost] += quantity;
    }

    for (let each of currentPlayer.cards) {
        totalBuyingPower[each.gemValue as keyof ResourceCost] += 1;
    }

    return totalBuyingPower;
}