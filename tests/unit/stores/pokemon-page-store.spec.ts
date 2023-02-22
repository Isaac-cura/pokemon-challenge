import { Pinia, createPinia, setActivePinia } from "pinia"
import { createApp } from "vue";
import { dummyBulbasaurParsed } from "../dummies/bulbasaur";
import { Failure, Success } from "@/models/either";
import { usePokemonListStore } from "@/stores/pokemon-list.store";
import { getAllSuccess, getAllSuccessWithPikachu, requestFailure } from "../stubs/pokemon-service.stub";

describe("test suite for pokemon page store", () => {

    let pinia: Pinia;
    let pokemonListStore: ReturnType<typeof usePokemonListStore>;

    beforeEach(() => {
        const app = createApp({})
        pinia = createPinia()
        app.use(pinia)
        setActivePinia(pinia)
        pinia.use(() => ({ $pokemonService: {} as any }))
        pokemonListStore = usePokemonListStore()
    })

    it("fetchAndUpdatePokemons action set the pokemons when the call its succesfully ", async () => {
        pokemonListStore.$pokemonService.getAll = getAllSuccess
        await pokemonListStore.fetchAndUpdatePokemons({ count: 0, offset: 0, limit: 10, segmentLength: 5 })
        expect(pokemonListStore.pokemons.bulbasaur).toBeDefined()
    })

    it("when a request fail the error flag must be setted in true ", async () => {
        pokemonListStore.$pokemonService.getAll = requestFailure as any;
        await pokemonListStore.fetchAndUpdatePokemons({ count: 0, offset: 0, limit: 10, segmentLength: 5 })
        expect(pokemonListStore.error).toBeTruthy()
    })

    it("when get a succesfully request the previous erros its cleared", async () => {
        pokemonListStore.$pokemonService.getAll = getAllSuccess
        pokemonListStore.error = true
        await pokemonListStore.fetchAndUpdatePokemons({ count: 0, offset: 0, limit: 10, segmentLength: 5 })
        expect(pokemonListStore.error).toBeFalsy()

    })

    it("when the data its fetching the loading flat its setted", async () => {
        pokemonListStore.$pokemonService.getAll = getAllSuccess
        //without the await to simulate the request delay
        pokemonListStore.fetchAndUpdatePokemons({ count: 0, offset: 0, limit: 10, segmentLength: 5 })
        expect(pokemonListStore.loading).toBeTruthy()
    })

    it("Loading flag its setted to false when the request end in success", async () => {
        pokemonListStore.$pokemonService.getAll = getAllSuccess
        pokemonListStore.loading = true;
        await pokemonListStore.fetchAndUpdatePokemons({ count: 0, offset: 0, limit: 10, segmentLength: 5 })
        expect(pokemonListStore.loading).toBeFalsy()
    })

    it("Loading flag its setted to false when the request end in failure", async () => {
        pokemonListStore.$pokemonService.getAll = requestFailure as any
        pokemonListStore.loading = true;
        await pokemonListStore.fetchAndUpdatePokemons({ count: 0, offset: 0, limit: 10, segmentLength: 5 })
        expect(pokemonListStore.loading).toBeFalsy()
    })
    it("The paginator info its update when a request its success", async () => {
        pokemonListStore.$pokemonService.getAll = getAllSuccess
        pokemonListStore.paginatorInfo.count = 0;
        pokemonListStore.paginatorInfo.offset = 0;
        await pokemonListStore.fetchAndUpdatePokemons({ count: 0, offset: 10, limit: 10, segmentLength: 5 })
        expect(pokemonListStore.paginatorInfo.count).not.toBe(0)
        expect(pokemonListStore.paginatorInfo.offset).not.toBe(0)
    })
    it("The paginator info remains equal after failure request", async () => {
        pokemonListStore.$pokemonService.getAll = requestFailure as any;
        pokemonListStore.paginatorInfo.count = 0;
        pokemonListStore.paginatorInfo.offset = 0;
        await pokemonListStore.fetchAndUpdatePokemons({ count: 0, offset: 10, limit: 10, segmentLength: 5 })
        expect(pokemonListStore.paginatorInfo.count).toBe(0)
        expect(pokemonListStore.paginatorInfo.offset).toBe(0)
    })
    it("fetchAndUpdatePokemons call the service with the right offset and limit", async () => {
        const getAllSuccessMock = jest.fn(getAllSuccess)
        pokemonListStore.$pokemonService.getAll = getAllSuccessMock
        await pokemonListStore.fetchAndUpdatePokemons({ count: 0, offset: 30, limit: 10, segmentLength: 5 })
        expect(getAllSuccessMock.mock.calls[0]).toEqual([10, 30])
    })
    it("successfully request override the latest pokemons", async () => {
        pokemonListStore.$pokemonService.getAll = getAllSuccessWithPikachu
        pokemonListStore.pokemons.bulbasaur = dummyBulbasaurParsed
        await pokemonListStore.fetchAndUpdatePokemons({ count: 0, offset: 30, limit: 10, segmentLength: 5 })
        expect(pokemonListStore.pokemons.bulbasaur).not.toBeDefined()
    })

    it("pokemonList getter returns empty array when the pokemons  state its empty", () => {
        expect(pokemonListStore.pokemonList).toEqual([])
    })

    it("pokemonList getter returns an array with the pokemons inside pokemons state", () => {
        pokemonListStore.pokemons.bulbasaur = dummyBulbasaurParsed
        expect(pokemonListStore.pokemonList).toEqual([dummyBulbasaurParsed])
    })

    it("pokemonList its updated when the pokemons change", async () => {
        pokemonListStore.$pokemonService.getAll = getAllSuccessWithPikachu
        pokemonListStore.pokemons.bulbasaur = dummyBulbasaurParsed
        expect(pokemonListStore.pokemonList).toEqual([dummyBulbasaurParsed])
        await pokemonListStore.fetchAndUpdatePokemons({ count: 0, offset: 30, limit: 10, segmentLength: 5 })
        expect(pokemonListStore.pokemonList).toEqual([{ ...dummyBulbasaurParsed, name: "pikachu" }])
    })
})
