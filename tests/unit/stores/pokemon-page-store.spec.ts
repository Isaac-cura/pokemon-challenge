import { Pinia, createPinia, setActivePinia } from "pinia"
import { createApp } from "vue";
import { dummyBulbasaurParsed } from "../dummies/bulbasaur";
import { Failure, Success } from "@/models/either";
import { usePokemonPageStore } from "@/stores/pokemon-page.store";

describe("test suite for pokemon page store", () => {

    let pinia: Pinia;
    let app = createApp({})
    beforeEach(() => {
        pinia = createPinia()
        app.use(pinia)
        setActivePinia(pinia)
    })

    it("fetchAndUpdatePokemons action set the pokemons when the call its succesfully ", async () => {
        injectToPinia.pokemonService.withSuccesfullyGetAll(pinia);
        const pokemonPageStore = usePokemonPageStore()
        await pokemonPageStore.fetchAndUpdatePokemons({ count: 0, offset: 0, limit: 10, segmentLength: 5 })
        expect(pokemonPageStore.pokemons.bulbasaur).toBeDefined()
    })

    it("when a request fail the error flag must be setted in true ", async () => {
        injectToPinia.pokemonService.withFailedGetAll(pinia)
        const pokemonPageStore = usePokemonPageStore()
        await pokemonPageStore.fetchAndUpdatePokemons({ count: 0, offset: 0, limit: 10, segmentLength: 5 })
        expect(pokemonPageStore.error).toBeTruthy()
    })

    it("when get a succesfully request the previous erros its cleared", async () => {
        injectToPinia.pokemonService.withSuccesfullyGetAll(pinia)
        const pokemonPageStore = usePokemonPageStore()
        pokemonPageStore.error = true
        await pokemonPageStore.fetchAndUpdatePokemons({ count: 0, offset: 0, limit: 10, segmentLength: 5 })
        expect(pokemonPageStore.error).toBeFalsy()

    })

    it("when the data its fetching the loading flat its setted", async () => {
        injectToPinia.pokemonService.withSuccesfullyGetAll(pinia)
        const pokemonPageStore = usePokemonPageStore()
        //without the await to simulate the request delay
        pokemonPageStore.fetchAndUpdatePokemons({ count: 0, offset: 0, limit: 10, segmentLength: 5 })
        expect(pokemonPageStore.loading).toBeTruthy()
    })

    it("Loading flag its setted to false when the request end in success", async () => {
        injectToPinia.pokemonService.withSuccesfullyGetAll(pinia)
        const pokemonPageStore = usePokemonPageStore()
        pokemonPageStore.loading = true;
        await pokemonPageStore.fetchAndUpdatePokemons({ count: 0, offset: 0, limit: 10, segmentLength: 5 })
        expect(pokemonPageStore.loading).toBeFalsy()
    })

    it("Loading flag its setted to false when the request end in failure", async () => {
        injectToPinia.pokemonService.withFailedGetAll(pinia)
        const pokemonPageStore = usePokemonPageStore()
        pokemonPageStore.loading = true;
        await pokemonPageStore.fetchAndUpdatePokemons({ count: 0, offset: 0, limit: 10, segmentLength: 5 })
        expect(pokemonPageStore.loading).toBeFalsy()
    })
    it("The paginator info its update when a request its success", async () => {
        injectToPinia.pokemonService.withSuccesfullyGetAll(pinia)
        const pokemonPageStore = usePokemonPageStore()
        pokemonPageStore.paginatorInfo.count = 0;
        pokemonPageStore.paginatorInfo.offset = 0;
        await pokemonPageStore.fetchAndUpdatePokemons({ count: 0, offset: 10, limit: 10, segmentLength: 5 })
        expect(pokemonPageStore.paginatorInfo.count).not.toBe(0)
        expect(pokemonPageStore.paginatorInfo.count).not.toBe(0)
    })
    it("The paginator info remains equal after failure request", async () => {
        injectToPinia.pokemonService.withFailedGetAll(pinia)
        const pokemonPageStore = usePokemonPageStore()
        pokemonPageStore.paginatorInfo.count = 0;
        pokemonPageStore.paginatorInfo.offset = 0;
        await pokemonPageStore.fetchAndUpdatePokemons({ count: 0, offset: 10, limit: 10, segmentLength: 5 })
        expect(pokemonPageStore.paginatorInfo.count).toBe(0)
        expect(pokemonPageStore.paginatorInfo.count).toBe(0)
    })
    it("fetchAndUpdatePokemons call the service with the right offset and limit", async () => {
        const mockFn = jest.fn(successfullyGetAll)
        injectGetAllPokemonServiceToPinia(pinia, mockFn)
        const pokemonPageStore = usePokemonPageStore()
        await pokemonPageStore.fetchAndUpdatePokemons({ count: 0, offset: 30, limit: 10, segmentLength: 5 })
        expect(mockFn.mock.calls[0]).toEqual([10, 30])
    })
    it("successfully request override the latest pokemons", async () => {
        injectGetAllPokemonServiceToPinia(pinia, successfullyGetAllWithPikachu)
        const pokemonPageStore = usePokemonPageStore()
        pokemonPageStore.pokemons.bulbasaur = dummyBulbasaurParsed
        await pokemonPageStore.fetchAndUpdatePokemons({ count: 0, offset: 30, limit: 10, segmentLength: 5 })
        expect(pokemonPageStore.pokemons.bulbasaur).not.toBeDefined()
    })

})

const injectToPinia = {
    pokemonService: {
        withSuccesfullyGetAll(pinia: Pinia) {
            injectGetAllPokemonServiceToPinia(pinia, successfullyGetAll)
        },
        withFailedGetAll(pinia: Pinia) {
            injectGetAllPokemonServiceToPinia(pinia, failedGetAll)
        }
    }
}

const injectGetAllPokemonServiceToPinia = (pinia: Pinia, getAll: any) => {
    pinia.use(() => ({
        $pokemonService: {
            getAll
        } as any
    }))
}

const successfullyGetAll = async (limit: number, offset: number) => new Success({
    count: 500,
    results: [dummyBulbasaurParsed]
})

const successfullyGetAllWithPikachu = async (limit: number, offset: number) =>  {
    return new Success({
        count: 500,
        results: [{
            ...dummyBulbasaurParsed,
            name: "pikachu"
        }]
    })
}

const failedGetAll = async () => Failure.create()
