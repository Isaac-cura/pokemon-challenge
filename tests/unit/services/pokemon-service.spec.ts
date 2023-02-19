import { Failure, Success } from "@/models/either";
import { PokemonService } from "@/services/pokemon.service"
import axios from "axios"
import MockAdapter from "axios-mock-adapter"
import { dummyBulbasaurRaw, dummyBulbasaurParsed } from "../dummies/bulbasaur";

describe("pokemon.services test suite", () => {

    let axiosMock: MockAdapter;
    const pokemonService = new PokemonService(axios)
    beforeEach(() => {
        axiosMock = new MockAdapter(axios)
    })

    it("get all pokemons returns a success instance when the request its successfully", async () => {
        axiosMock.onGet(/offset/).reply(200, {
            count: 1000,
            results: [{
                name: "bulbasaur",
                url: "https://pokeapi.co/api/v2/pokemon/1/"
            }]
        })
        const response = await pokemonService.getAll(10, 0)
        expect(response).toBeInstanceOf(Success)
    })

    it("get all pokemons returns a pokemon list in the success when the request its succesfully", async () => {
        axiosMock.onGet(/offset/).reply(200, {
            count: 1000,
            results: [{
                name: "bulbasaur",
                url: "https://pokeapi.co/api/v2/pokemon/1/"
            }]
        })

        axiosMock.onGet(/bulbasaur/).reply(200, dummyBulbasaurRaw)
        const response = await pokemonService.getAll(10, 0)

        expect((response as any).result).toStrictEqual({
            count: 1000,
            results: [dummyBulbasaurParsed]
        })
    })

    it("Get all enpoint filter the failed pokemon if has failed in get details but doesnt return error in order to show the others", async () => {
        axiosMock.onGet(/offset/).reply(200, {
            count: 1000,
            results: [{
                name: "bulbasaur",
                url: "https://pokeapi.co/api/v2/pokemon/1/"
            }]
        })
        axiosMock.onGet(/bulbasaur/).reply(500)
        const response = await pokemonService.getAll(10, 0)
        expect((response as any).result).toEqual({
            count: 1000,
            results: []
        })
    })

    it("get all pokemons returns a failure instance when the endpoint fails", async () => {
        axiosMock.onGet().reply(500, "Server error")
        const pokemonService = new PokemonService(axios);
        const response = await pokemonService.getAll(10, 0)
        expect(response).toBeInstanceOf(Failure)
    })

    it("get by name pokemon returns parsed pokemon when its success", async () => {
            axiosMock.onGet(/bulbasaur/).reply(200, dummyBulbasaurRaw)
            const response = await pokemonService.getByName("bulbasaur")
            expect((response as any).result).toStrictEqual(dummyBulbasaurParsed)
    })

    it("Get pokemon by name returns an Success instance when te request its succesffully", async () => {
        axiosMock.onGet(/bulbasaur/).reply(200, dummyBulbasaurRaw)
        const response = await pokemonService.getByName("bulbasaur")
        expect(response).toBeInstanceOf(Success)    
    })

    it("Get pokemon by name returns an Failure instance when the request fails", async () => {
        axiosMock.onGet(/bulbasaur/).reply(500, dummyBulbasaurRaw)
        const response = await pokemonService.getByName("bulbasaur")
        expect(response).toBeInstanceOf(Failure)   
    })

})
