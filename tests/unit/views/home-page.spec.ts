import HomePage from '@/views/HomePage.vue'
import { VueWrapper, mount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import { usePokemonListStore } from '@/stores/pokemon-list.store'
import { nextTick } from 'vue'
import { dummyBulbasaurParsed } from '../dummies/bulbasaur'

describe("test suite for the home page", () => {

    let homePageWrapper: VueWrapper;
    beforeEach(() => {
        homePageWrapper = mount(HomePage, {
            global: {
                plugins: [createTestingPinia()]
            }
        })
    })
    it("the home page has paginator", () => {
        expect(homePageWrapper.find("[data-test=item-paginator]").element).toBeDefined()
    })
    it("the paginator buttons quantity coincide with the paginator info in the store", async () => {
        const pokemonListStore = usePokemonListStore()
        pokemonListStore.paginatorInfo = { "count": 100, "offset": 0, "limit": 5, "segmentLength": 5 }
        await nextTick()
        expect(homePageWrapper.find("[data-test=item-paginator]").findAll("button")).toHaveLength(7)
        pokemonListStore.paginatorInfo = { "count": 15, "offset": 0, "limit": 5, "segmentLength": 5 }
        await nextTick()
        expect(homePageWrapper.find("[data-test=item-paginator]").findAll("button")).toHaveLength(5)
    })

    it("the home calls the fetchPokemon action after mount", () => {
        const pokemonListStore = usePokemonListStore()
        expect(pokemonListStore.fetchAndUpdatePokemons).toBeCalled()
    })

    it("home not render any pokemon when the pokemons list in the store its empty", () => {
        expect(homePageWrapper.findAll("[data-test=pokemon-card]").length).toBe(0)
    })

    it("home show pokemons when are pokemons avaibales", async () => {
        const pokemonListStore = usePokemonListStore()
        pokemonListStore.pokemons = {bulbasaur: dummyBulbasaurParsed, pikachu: dummyBulbasaurParsed}
        await nextTick()
        expect(homePageWrapper.findAll("[data-test=pokemon-card]").length).not.toBe(0)
    })

    it("when click in pagination the fetch pokemon function was called with right values", async () => {
        const pokemonListStore = usePokemonListStore()
        pokemonListStore.paginatorInfo = { "count": 100, "offset": 0, "limit": 5, "segmentLength": 5 }
        await nextTick()
        const thirdPageButton = homePageWrapper.find("[data-test=item-paginator]").findAll("button")[3]
        await thirdPageButton.trigger("click")
        expect(pokemonListStore.fetchAndUpdatePokemons).toHaveBeenLastCalledWith({count: 100, offset: 10, limit: 5, segmentLength: 5})

    })

})