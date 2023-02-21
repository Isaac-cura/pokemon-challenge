import PokemonDetailPage from '@/views/PokemonDetailsPage.vue'
import { VueWrapper, mount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing';
import { usePokemonDetailStore } from '@/stores/pokemon-detail.store';
import { useRoute } from 'vue-router';
import { dummyBulbasaurParsed } from '../dummies/bulbasaur';
import { capitalize, nextTick } from 'vue';


jest.mock("vue-router", () => ({
    useRoute: jest.fn()
}))

describe("test suite for pokemon details page", () => {
    let pokemonDetailPageWrapper: VueWrapper;
    let pokemonDetailStore: ReturnType<typeof usePokemonDetailStore>
    let mockedUseRoute = <jest.Mocked<ReturnType<typeof jest.fn>>>useRoute


    const refreshMount = () => {
        pokemonDetailPageWrapper = mount(PokemonDetailPage, {
            global: {
                plugins: [createTestingPinia()],
            }
        });
        pokemonDetailStore = usePokemonDetailStore() //need to be reseted because the new createTesting pinia before
        pokemonDetailStore.activePokemon = dummyBulbasaurParsed
    }


    beforeEach(() => {
        mockedUseRoute.mockImplementation(stubUseRouteWithName("bulbasaur"))
        refreshMount()
    })

    it("When the page its mounted the setActivePokemon method in pokemonDetail store its called", () => {
        expect(pokemonDetailStore.setActivePokemon).toHaveBeenCalled()
    })

    it("When the page its mounted the setActivePokemon method is called with the id provided in the route", () => {
        expect(pokemonDetailStore.setActivePokemon).toHaveBeenCalledWith("bulbasaur")
        mockedUseRoute.mockImplementation(stubUseRouteWithName("pikachu"))
        refreshMount() // need to refresh mount because onMount only trigged after mount not after
        expect(pokemonDetailStore.setActivePokemon).toHaveBeenCalledWith("pikachu")
    })

    it("The pokemon its render when the activePokemon its setted in the store", async () => {
        expect(pokemonDetailPageWrapper.text()).toContain(capitalize(dummyBulbasaurParsed.name))
    })

    it("The pokemon doesnt rendered when the active pokemon its setted but its different to the route name provided", async () => {
        mockedUseRoute.mockImplementation(stubUseRouteWithName("pikachu"))
        refreshMount()
        expect(pokemonDetailPageWrapper.text()).not.toContain("pikachu")
        expect(pokemonDetailPageWrapper.text()).not.toContain("bulbasaur")
    })
    it("The page contains an image with the source of active pokemon", () => {
        const img = pokemonDetailPageWrapper.find("ion-img").element;
        expect(img).toBeDefined()
        expect(img.src).toBe(dummyBulbasaurParsed.imageUrl)
    })
    it("The page has two ion-segment buttons with the text about and moves", () => {
        const segmentButons = pokemonDetailPageWrapper.findAll("ion-segment-button")
        expect(segmentButons[0].text()).toContain("About")
        expect(segmentButons[1].text()).toContain("Moves")
    })
    it("When about its selected the pokemon-details component its showen", () => {
        pokemonDetailStore.activeTab = "about"
        expect(pokemonDetailPageWrapper.find("[data-test=pokemon-details]").exists()).toBeTruthy()
    })
    it("When the moves tab its selected pokemon-details component its not shown", async () => {
        pokemonDetailStore.activeTab = "moves"
        await nextTick()
        expect(pokemonDetailPageWrapper.find("[data-test=pokemon-details]").exists()).toBeFalsy()
    })
    it("When about its selected the pokemon-moves component its not shown", () => {
        pokemonDetailStore.activeTab = "about"
        expect(pokemonDetailPageWrapper.find("[data-test=pokemon-moves]").exists()).toBeFalsy()
    })
    it("When the moves tab its selected pokemon-moves compinent its shown", async () => {
        pokemonDetailStore.activeTab = "moves"
        await nextTick()
        expect(pokemonDetailPageWrapper.find("[data-test=pokemon-moves]").exists()).toBeTruthy()
    })

})

const stubUseRouteWithName = (name: string) => () => {
    return {
        params: {
            name
        }
    }
}