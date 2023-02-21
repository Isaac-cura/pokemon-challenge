import { createPinia, setActivePinia } from "pinia"
import { createApp } from "vue";
import { getByNameSuccess, requestFailure } from "../stubs/pokemon-service.stub";
import { usePokemonDetailStore } from "@/stores/pokemon-detail.store";
import { usePokemonListStore } from "@/stores/pokemon-list.store";
import { dummyBulbasaurParsed } from "../dummies/bulbasaur";

describe("test suite for pokemon detail store", () => {
    let pokemonListStore: ReturnType<typeof usePokemonListStore>
    let pokemonDetailStore: ReturnType<typeof usePokemonDetailStore> ;
    beforeEach(() => {
        const pinia = createPinia()
        const app = createApp({})
        app.use(pinia)
        setActivePinia(pinia)
        pinia.use(() => ({$pokemonService: {} as any}))
        pokemonListStore = usePokemonListStore();
        pokemonDetailStore = usePokemonDetailStore();
    })

    it("set active pokemon doesnt call the endpoint when the pokemon is in the pokemon list", () => {
        const getByNameSuccessMock = jest.fn(getByNameSuccess)
        pokemonDetailStore.$pokemonService.getByName = getByNameSuccessMock;
        pokemonListStore.pokemons.bulbasaur = dummyBulbasaurParsed
        pokemonDetailStore.setActivePokemon(dummyBulbasaurParsed.name)
        expect(getByNameSuccessMock).not.toHaveBeenCalled()
    })
    it("set active pokemon call endpoint with the right pokemon name when the pokemon name its not in the pokemon list", () => {
        const getByNameSuccessMock = jest.fn(getByNameSuccess)
        pokemonDetailStore.$pokemonService.getByName = getByNameSuccessMock
        pokemonDetailStore.setActivePokemon(dummyBulbasaurParsed.name)
        expect(getByNameSuccessMock).toHaveBeenCalledWith(dummyBulbasaurParsed.name)
    })
    it("when the requested pokemon to set its the current active pokemon doesnt call the endpoint", () => {
        const getByNameSuccessMock = jest.fn(getByNameSuccess)
        pokemonDetailStore.$pokemonService.getByName = getByNameSuccessMock
        pokemonDetailStore.activePokemon = dummyBulbasaurParsed
        pokemonDetailStore.setActivePokemon(dummyBulbasaurParsed.name)
        expect(getByNameSuccessMock).not.toHaveBeenCalled()
    })
    it("set the requested pokemon as active if its in the pokemon list", () => {
        pokemonListStore.pokemons.bulbasaur = dummyBulbasaurParsed;
        pokemonDetailStore.setActivePokemon(dummyBulbasaurParsed.name);
        expect(pokemonDetailStore.activePokemon).toEqual(dummyBulbasaurParsed)
    })
    it("setActivePokemon that need call the services set it when the request its success", async () => {
        pokemonDetailStore.$pokemonService.getByName = getByNameSuccess
        await pokemonDetailStore.setActivePokemon(dummyBulbasaurParsed.name)
        expect(pokemonDetailStore.activePokemon).toEqual(dummyBulbasaurParsed)
    })
    it("set loading when the setActivePokemon make a request against backend", () => {
        pokemonDetailStore.$pokemonService.getByName = requestFailure as any;
        pokemonDetailStore.setActivePokemon(dummyBulbasaurParsed.name) //without await to check loading flag
        expect(pokemonDetailStore.loading).toBeTruthy()
    })
    it("the loading flag is false when setActivepokemon fails", async () => {
        pokemonDetailStore.$pokemonService.getByName = requestFailure as any;
        await pokemonDetailStore.setActivePokemon(dummyBulbasaurParsed.name)
        expect(pokemonDetailStore.loading).toBeFalsy()
    })
    it("the loading flag is false when setActive pokemon request its success", async () => {
        pokemonDetailStore.$pokemonService.getByName = getByNameSuccess;
        await pokemonDetailStore.setActivePokemon(dummyBulbasaurParsed.name)
        expect(pokemonDetailStore.loading).toBeFalsy()
    })
    it("the error flag is true when setActive pokemon request fail", async () => {
        pokemonDetailStore.$pokemonService.getByName = requestFailure as any;
        await pokemonDetailStore.setActivePokemon(dummyBulbasaurParsed.name)
        expect(pokemonDetailStore.error).toBeTruthy()
    })
    it("the error flag is false when setActive pokemon request is success", async () => {
        pokemonDetailStore.$pokemonService.getByName = getByNameSuccess
        await pokemonDetailStore.setActivePokemon(dummyBulbasaurParsed.name)
        expect(pokemonDetailStore.error).toBeFalsy()
    })
    it("the error flag is false when setActive pokemon request its success after failed before", async () => {
        pokemonDetailStore.$pokemonService.getByName = getByNameSuccess;
        pokemonDetailStore.error = true;
        await pokemonDetailStore.setActivePokemon(dummyBulbasaurParsed.name);
        expect(pokemonDetailStore.error).toBeFalsy();
    })
    it("getIfActive getter returns undefined if no active pokemon is setted", ()=> {
        const pokemon = pokemonDetailStore.getIfActive(dummyBulbasaurParsed.name);
        expect(pokemon).toBeUndefined();
    })
    it("getIfActive getter returns the pokemon if an activePokemon its setted", () => {
        pokemonDetailStore.activePokemon = dummyBulbasaurParsed;
        const pokemon = pokemonDetailStore.getIfActive(dummyBulbasaurParsed.name);
        expect(pokemon).toBeDefined();
    })
    it("getIfActive getter returns undefined if an activePokemon its setted but not its the same", () => {
        pokemonDetailStore.activePokemon = dummyBulbasaurParsed;
        const pokemon = pokemonDetailStore.getIfActive("pikachu");
        expect(pokemon).toBeUndefined();
    })
    it("setActiveTab change the active tab", () => {
        const activeTab = pokemonDetailStore.activeTab;
        pokemonDetailStore.setActiveTab("moves");
        expect(pokemonDetailStore.activeTab).not.toBe(activeTab);
    })
    it("setActive tab doesnt change if the active tab its the same provied in the method", () => {
        const activeTab = pokemonDetailStore.activeTab;
        pokemonDetailStore.setActiveTab(activeTab);
        expect(pokemonDetailStore.activeTab).toBe(activeTab)
    } )
})