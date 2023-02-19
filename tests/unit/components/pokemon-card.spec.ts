import PokemonCard from "@/components/pokemon-card.vue"
import { VueWrapper, mount } from '@vue/test-utils'
import { dummyBulbasaurParsed } from "../dummies/bulbasaur"
import { pokemonTypeIcon } from "@/constants/types-icons";
import { capitalize } from "vue";

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

    it("The element show the pokemon name capitalized", () => {
        expect(pokemonCard.text()).toContain(capitalize(dummyBulbasaurParsed.name))
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
            expect(pokemonCard.text()).toContain(capitalize(type))
        })
    })

    it("the component render an icon for each pokemon type", () => {
        expect(pokemonCard.findAll("ion-icon")).toHaveLength(dummyBulbasaurParsed.types.length)
    })

    it("the icon of pokemon types correspond to the type image", () => {
        dummyBulbasaurParsed.types.forEach((type, i) => {
            const iconPath = pokemonTypeIcon(type)
            expect(pokemonCard.findAll("ion-icon")[i].element.src).toBe(iconPath)    
        })
    })

    it("pokemon card emit event when its clicked", () => {
        pokemonCard.trigger("click")
        expect(pokemonCard.emitted("click")).toHaveLength(1)
    })

    it("pokemon card emit the pokemon when user press it", () => {
        pokemonCard.trigger("click")
        const result = pokemonCard.emitted("click")
        expect(result![0][0]).toEqual(dummyBulbasaurParsed)
    })

    it("pokemon modify the id adding left 0 when pokemonCount its setted", () => {
        pokemonCard = mount(PokemonCard, {
            props: {
                pokemon: dummyBulbasaurParsed,
                pokemonCount: 1000
            }
        })
        expect(pokemonCard.html()).toContain("# 0001")
    })

    it("pokemon returns the same pokemon id whe a negative pokemonCount its provided", () => {
        pokemonCard = mount(PokemonCard, {
            props: {
                pokemon: dummyBulbasaurParsed,
                pokemonCount: -1000
            }
        })
        expect(pokemonCard.html()).toContain("# 1")
    })

})