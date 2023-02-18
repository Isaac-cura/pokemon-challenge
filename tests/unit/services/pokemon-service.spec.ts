import { Failure, Success } from "@/models/either";
import { PokemonService } from "@/services/pokemon.service"
import axios from "axios"
import MockAdapter from "axios-mock-adapter"

describe("pokemon.services test suite", () => {

    let axiosMock: MockAdapter;

    beforeEach(() => {
        axiosMock = new MockAdapter(axios)
    })

    it("get all pokemons returns a success instance when the request its successfully", async () => {
        axiosMock.onGet().reply(200, {
            count: 1000,
            results: [{
                name: "bulbasaur",
                url: "https://pokeapi.co/api/v2/pokemon/1/"
            }]
        })
        const pokemonService = new PokemonService(axios);
        const response = await pokemonService.getAll(10, 0)
        expect(response).toBeInstanceOf(Success)
    })

    it("get all pokemons returns a pokemon list in the success when the request its succesfully", async () => {
        axiosMock.onGet().reply(200, {
            count: 1000,
            results: [{
                name: "bulbasaur",
                url: "https://pokeapi.co/api/v2/pokemon/1/"
            }]
        })
        const pokemonService = new PokemonService(axios);
        const response = await pokemonService.getAll(10, 0)
        expect((response as any).result).toEqual({
            count: 1000,
            results: [{
                id: 1,
                name: "bulbasaur",
                imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/1.png"
            }]
        })
    })

    it("get all pokemons returns a failure instance when the endpoint fails", async () => {
        axiosMock.onGet().reply(500, "Server error")
        const pokemonService = new PokemonService(axios);
        const response = await pokemonService.getAll(10, 0)
        expect(response).toBeInstanceOf(Failure)
    })

})
