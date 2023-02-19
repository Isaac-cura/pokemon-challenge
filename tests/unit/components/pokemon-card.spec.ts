import PokemonCard from "@/components/pokemon-card.vue"
import { VueWrapper, mount } from '@vue/test-utils'
import { dummyBulbasaurParsed } from "../dummies/bulbasaur"

describe("Test suite for pokemon card component", () => {
    let pokemonCard: VueWrapper;
    beforeEach(() => {
        pokemonCard = mount(PokemonCard, {
            props: {
                pokemon: dummyBulbasaurParsed
            }
        })
    })
    it("The card render the pokemon information", () => {
        expect(pokemonCard.find("ion-img").element.src).toBe(dummyBulbasaurParsed.imageUrl)
    })

    it("The element show the pokemon name", () => {
        expect(pokemonCard.text()).toContain(dummyBulbasaurParsed.name)
    })

    it("The card shows the pokemon id", () => {
        expect(pokemonCard.text()).toContain("# 1")
    })

    it("The card render the moves quantity", () => {
        expect(pokemonCard.text()).toContain(`Moves ${dummyBulbasaurParsed.moves.length}`)
    })

    it("The card render the experience", () => {
        expect(pokemonCard.text()).toContain(`Experience ${dummyBulbasaurParsed.experience}`)
    })

    it("The card shows the pokemon type", () => {
        dummyBulbasaurParsed.types.forEach((type) => {
            expect(pokemonCard.text()).toContain(type)
        })
    })

})