import { VueWrapper, mount } from "@vue/test-utils"
import PokemonDetails from '@/components/pokemon-details.vue'
import { dummyBulbasaurParsed } from "../dummies/bulbasaur"
import { getHeightLabel, getWeightLabel } from "@/utils/transformers"
describe("test suite for pokemon details component", () => {
    let pokemonExperienceWrapper: VueWrapper
    
    beforeEach(()=> {
        pokemonExperienceWrapper = mount(PokemonDetails, {
            props:{
                pokemon: dummyBulbasaurParsed
            }
        })
    })

    it("the pokemon experience its shown", () => {
        expect(pokemonExperienceWrapper.text()).toContain("Experience: 64")
    })

    it("the height its properly shown", () => {
        expect(pokemonExperienceWrapper.html()).toContain("Height")
        expect(pokemonExperienceWrapper.html()).toContain("2' 4 (70cm)")
    })

    it("the weight of pokemon its properly shown", () => {
        expect(pokemonExperienceWrapper.html()).toContain("Weight")
        expect(pokemonExperienceWrapper.html()).toContain("6.9Kg (15.21Lbs)")
    })

    it("the list of abilities it propery shown", () => {
        expect(pokemonExperienceWrapper.html()).toContain("Abilities:")
        expect(pokemonExperienceWrapper.html()).toContain("Overgrow, Chlorophyll")
    })

    it("the pokemon types are showns", () => {        
        expect(pokemonExperienceWrapper.html()).toContain("Type:")
        expect(pokemonExperienceWrapper.html()).toContain("Grass")
        expect(pokemonExperienceWrapper.html()).toContain("Poison")
    })

    it("the chart its shown", () => {
        expect(pokemonExperienceWrapper.find("[data-test=chart]").exists()).toBeTruthy()
    })
})