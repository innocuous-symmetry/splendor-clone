import getTotalBuyingPower from "./getTotalBuyingPower";
import { NobleData, PlayerData, ResourceCost } from "./types";

export const canPickUpNoble = (player: PlayerData, noble: NobleData) => {
    const totalBuyingPower = getTotalBuyingPower(player);
    const playerInventory = player.inventory;

    for (let key of Object.keys(totalBuyingPower)) {
        const typedKey = key as keyof ResourceCost;
        let coinValue = playerInventory[typedKey] || 0;

        if (!noble.resourceCost[typedKey]) continue;
        // @ts-ignore
        if ((totalBuyingPower[typedKey] - coinValue) >= noble.resourceCost[typedKey]) {
            continue;
        } else {
            return;
        }
    }

    return noble;
}