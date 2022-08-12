import { describe, expect, it, test, vi } from "vitest"
import Adapter from 'enzyme-adapter-react-16';
import { shallow } from "enzyme"
import { initialState } from "../../../../hooks/stateSetters"
import { mockCardRows, mockPlayerOne, mockPlayerTwo, sampleTierOneCard } from "../../../../util/testUtils"
import { AppState, PlayerData, setStateType } from "../../../../util/types"
import { buyCard, tooExpensive } from "../buyCardActions"
import { configure } from "enzyme";
import Player from "../../Player"
import Gameboard from "../../../Gameboard/Gameboard";
import initializeBoard from "../../../../util/initializeBoard";
import React from "react";

configure({ adapter: new Adapter() });

const testPlayer: PlayerData = {
    name: "Test Player",
    id: 1,
    starter: true,
    turnActive: true,
    points: 0,
    cards: [],
    nobles: [],
    inventory: {
        ruby: 1,
        sapphire: 1,
        emerald: 1,
        diamond: 1,
        onyx: 1
    }
}

describe("buy card methods", () => {
    describe("tooExpensive", () => {
        it('detects unaffordable cards', () => {
            const sampleState: AppState = {
                ...initialState,
                players: [testPlayer, mockPlayerTwo]
            }
        
            expect(tooExpensive(sampleTierOneCard, sampleState)).toBeTruthy();
        })

        it('accounts for gold chips', () => {
            const goldPlayer: PlayerData = {
                ...testPlayer,
                inventory: {
                    ruby: 1,
                    sapphire: 1,
                    emerald: 1,
                    diamond: 1,
                    onyx: 2,
                    gold: 1
                }
            }
        
            const sampleState: AppState = {
                ...initialState,
                players: [goldPlayer, mockPlayerTwo],
            }
        
            expect(tooExpensive(sampleTierOneCard, sampleState)).toBeFalsy();
        })
    })

    describe('buyCard', () => {
        const setState: setStateType = vi.fn();

        test('renders Player component', () => {
            const wrapper = shallow(<Player player={testPlayer} state={initialState} setState={setState} />)
            const name = wrapper.contains("Test Player");
            expect(name).toBeTruthy();
        })

        it('updates player inventory', () => {
            // const updatedPlayerOne: PlayerData = {
            //     ...mockPlayerOne,
            //     inventory: {
            //         ...mockPlayerOne.inventory,
            //         onyx: 3
            //     }
            // }

            // const currentState: AppState = {
            //     ...initialState,
            //     players: [updatedPlayerOne, mockPlayerTwo],
            //     gameboard: {
            //         ...initialState.gameboard,
            //         cardRows: mockCardRows
            //     }
            // }

            // // shallow renders a new gameboard component which encapsulates current players
            // const wrapper = shallow(<Gameboard state={currentState} setState={setState} />)
            // initializeBoard(currentState, setState);

            // expect(currentState.gameboard.cardRows.tierOne).toHaveLength(4);
            // expect(currentState.gameboard.cardRows.tierOne).toContain(sampleTierOneCard);

            // const playerUI = shallow((<Player player={updatedPlayerOne} state={currentState} setState={setState}></Player>))
            // expect(playerUI.children()).toContain("Name: Player One");
        })

        it('spends a player\'s gold when necessary', () => {

        })

        it('updates gameboard resources', () => {

        })

        it('triggers player to pick up first possible noble', () => {

        })

        it('only allows one noble to be acquired at a time', () => {
            expect(1).toBe(0);
        })
    })
})

export default {}