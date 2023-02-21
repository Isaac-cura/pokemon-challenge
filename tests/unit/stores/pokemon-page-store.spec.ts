import { Pinia, createPinia, setActivePinia } from "pinia"
import { createApp } from "vue";
import { dummyBulbasaurParsed } from "../dummies/bulbasaur";
import { Failure, Success } from "@/models/either";
import { usePokemonListStore } from "@/stores/pokemon-list.store";

describe("test suite for pokemon page store", () => {

    let pinia: Pinia;
  
    beforeEach(() => {
        let app = createApp({})
        pinia = createPinia()
        app.use(pinia)
        setActivePinia(pinia)
    })

    it("fetchAndUpdatePokemons action set the pokemons when the call its succesfully ", async () => {
        injectToPinia.pokemonService.withSuccesfullyGetAll(pinia);
        const pokemonListStore = usePokemonListStore()
        await pokemonListStore.fetchAndUpdatePokemons({ count: 0, offset: 0, limit: 10, segmentLength: 5 })
        expect(pokemonListStore.pokemons.bulbasaur).toBeDefined()
    })

    it("when a request fail the error flag must be setted in true ", async () => {
        injectToPinia.pokemonService.withFailedGetAll(pinia)
        const pokemonListStore = usePokemonListStore()
        await pokemonListStore.fetchAndUpdatePokemons({ count: 0, offset: 0, limit: 10, segmentLength: 5 })
        expect(pokemonListStore.error).toBeTruthy()
    })

    it("when get a succesfully request the previous erros its cleared", async () => {
        injectToPinia.pokemonService.withSuccesfullyGetAll(pinia)
        const pokemonListStore = usePokemonListStore()
        pokemonListStore.error = true
        await pokemonListStore.fetchAndUpdatePokemons({ count: 0, offset: 0, limit: 10, segmentLength: 5 })
        expect(pokemonListStore.error).toBeFalsy()

    })

    it("when the data its fetching the loading flat its setted", async () => {
        injectToPinia.pokemonService.withSuccesfullyGetAll(pinia)
        const pokemonListStore = usePokemonListStore()
        //without the await to simulate the request delay
        pokemonListStore.fetchAndUpdatePokemons({ count: 0, offset: 0, limit: 10, segmentLength: 5 })
        expect(pokemonListStore.loading).toBeTruthy()
    })

    it("Loading flag its setted to false when the request end in success", async () => {
        injectToPinia.pokemonService.withSuccesfullyGetAll(pinia)
        const pokemonListStore = usePokemonListStore()
        pokemonListStore.loading = true;
        await pokemonListStore.fetchAndUpdatePokemons({ count: 0, offset: 0, limit: 10, segmentLength: 5 })
        expect(pokemonListStore.loading).toBeFalsy()
    })

    it("Loading flag its setted to false when the request end in failure", async () => {
        injectToPinia.pokemonService.withFailedGetAll(pinia)
        const pokemonListStore = usePokemonListStore()
        pokemonListStore.loading = true;
        await pokemonListStore.fetchAndUpdatePokemons({ count: 0, offset: 0, limit: 10, segmentLength: 5 })
        expect(pokemonListStore.loading).toBeFalsy()
    })
    it("The paginator info its update when a request its success", async () => {
        injectToPinia.pokemonService.withSuccesfullyGetAll(pinia)
        const pokemonListStore = usePokemonListStore()
        pokemonListStore.paginatorInfo.count = 0;
        pokemonListStore.paginatorInfo.offset = 0;
        await pokemonListStore.fetchAndUpdatePokemons({ count: 0, offset: 10, limit: 10, segmentLength: 5 })
        expect(pokemonListStore.paginatorInfo.count).not.toBe(0)
        expect(pokemonListStore.paginatorInfo.count).not.toBe(0)
    })
    it("The paginator info remains equal after failure request", async () => {
        injectToPinia.pokemonService.withFailedGetAll(pinia)
        const pokemonListStore = usePokemonListStore()
        pokemonListStore.paginatorInfo.count = 0;
        pokemonListStore.paginatorInfo.offset = 0;
        await pokemonListStore.fetchAndUpdatePokemons({ count: 0, offset: 10, limit: 10, segmentLength: 5 })
        expect(pokemonListStore.paginatorInfo.count).toBe(0)
        expect(pokemonListStore.paginatorInfo.count).toBe(0)
    })
    it("fetchAndUpdatePokemons call the service with the right offset and limit", async () => {
        const mockFn = jest.fn(successfullyGetAll)
        injectMethodPokemonServiceToPinia(pinia,"getAll", mockFn)
        const pokemonListStore = usePokemonListStore()
        await pokemonListStore.fetchAndUpdatePokemons({ count: 0, offset: 30, limit: 10, segmentLength: 5 })
        expect(mockFn.mock.calls[0]).toEqual([10, 30])
    })
    it("successfully request override the latest pokemons", async () => {
        injectMethodPokemonServiceToPinia(pinia,"getAll", successfullyGetAllWithPikachu)
        const pokemonListStore = usePokemonListStore()
        pokemonListStore.pokemons.bulbasaur = dummyBulbasaurParsed
        await pokemonListStore.fetchAndUpdatePokemons({ count: 0, offset: 30, limit: 10, segmentLength: 5 })
        expect(pokemonListStore.pokemons.bulbasaur).not.toBeDefined()
    })
    it("pokemonList getter returns empty array when the pokemons  state its empty", () => {
        const pokemonListStore = usePokemonListStore()
        expect(pokemonListStore.pokemonList).toEqual([])
    })
    it("pokemonList getter returns an array with the pokemons inside pokemons state", () => {
        const pokemonListStore = usePokemonListStore()
        pokemonListStore.pokemons.bulbasaur = dummyBulbasaurParsed
        expect(pokemonListStore.pokemonList).toEqual([dummyBulbasaurParsed])
    })
    it("pokemonList its updated when the pokemons change", async () => {
        injectMethodPokemonServiceToPinia(pinia, "getAll",successfullyGetAllWithPikachu)
        const pokemonListStore = usePokemonListStore()
        pokemonListStore.pokemons.bulbasaur = dummyBulbasaurParsed
        expect(pokemonListStore.pokemonList).toEqual([dummyBulbasaurParsed])
        await pokemonListStore.fetchAndUpdatePokemons({ count: 0, offset: 30, limit: 10, segmentLength: 5 })
        expect(pokemonListStore.pokemonList).toEqual([{...dummyBulbasaurParsed, name: "pikachu"}])
    })
})

const injectToPinia = {
    pokemonService: {
        withSuccesfullyGetAll(pinia: Pinia) {
            injectMethodPokemonServiceToPinia(pinia,"getAll", successfullyGetAll)
        },
        withFailedGetAll(pinia: Pinia) {
            injectMethodPokemonServiceToPinia(pinia,"getAll", failedGetAll)
        },
        withSuccessGetByName(pinia: Pinia) {
            injectMethodPokemonServiceToPinia(pinia, "getByName", successGetByName)
        }
    }
}

const successGetByName = async () => {
    return Success.create(dummyBulbasaurParsed)
}

const injectMethodPokemonServiceToPinia = (pinia: Pinia,methodName: "getAll" | "getByName", method: any) => { 
    pinia.use(() => ({
        $pokemonService: {
            [methodName]: method
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
