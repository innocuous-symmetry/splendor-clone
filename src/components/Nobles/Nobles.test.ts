import { describe, test } from "vitest";
import { CardData, NobleData, PlayerData } from "../../util/types";

export const firstNoble: NobleData = {
    points: 3,
    resourceCost: {
      ruby: 0,
      sapphire: 0,
      emerald: 0,
      onyx: 0,
      diamond: 3
    }
  }
  
  export const secondNoble: NobleData = {
    points: 3,
    resourceCost: {
      ruby: 3,
      sapphire: 0,
      emerald: 0,
      onyx: 0,
      diamond: 0
    }
  }
  
  const exampleOneCards: CardData[] = [
    {
      gemValue: "diamond",
      tier: 3,
      points: 0,
      resourceCost: {
        ruby: 0,
        sapphire: 0,
        emerald: 0,
        onyx: 0,
        diamond: 3
      }
    },
    {
      gemValue: "diamond",
      tier: 3,
      points: 1,
      resourceCost: {
        ruby: 0,
        sapphire: 0,
        emerald: 0,
        onyx: 0,
        diamond: 4
      }
    },
    {
      gemValue: "diamond",
      tier: 2,
      points: 2,
      resourceCost: {
        ruby: 0,
        sapphire: 0,
        emerald: 0,
        onyx: 0,
        diamond: 5
      }
    }
]
  
export const legalPlayer: PlayerData = {
    name: "First example",
    id: 1,
    starter: true,
    turnActive: true,
    points: 5,
    nobles: [],
    cards: exampleOneCards,
    reservedCards: [],
    inventory: {
      ruby: 0,
      sapphire: 0,
      emerald: 0,
      onyx: 0,
      diamond: 0
    }
}
  
const exampleTwoCards: CardData[] = [
    {
      gemValue: "ruby",
      tier: 2,
      points: 2,
      resourceCost: {
        ruby: 5,
        sapphire: 0,
        emerald: 0,
        onyx: 0,
        diamond: 0
      }
    },
    {
      gemValue: "ruby",
      tier: 3,
      points: 1,
      resourceCost: {
        ruby: 4,
        sapphire: 0,
        emerald: 0,
        onyx: 0,
        diamond: 0
      }
    },
    {
      gemValue: "ruby",
      tier: 3,
      points: 0,
      resourceCost: {
        ruby: 3,
        sapphire: 0,
        emerald: 0,
        onyx: 0,
        diamond: 0
      }
    },
]
  
export const doesNotIncludeInventory: PlayerData = {
    name: "second example",
    id: 2,
    starter: true,
    turnActive: true,
    points: 5,
    nobles: [],
    cards: exampleTwoCards,
    reservedCards: [],
    inventory: {
      ruby: 3,
      sapphire: 3,
      emerald: 3,
      onyx: 3,
      diamond: 3,
    }
}

describe('canPickUpNoble', () => {
    test('detects noble eligibility by card count', () => {

    })
})