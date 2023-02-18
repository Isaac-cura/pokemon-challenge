import { PokemonService } from "@/services/pokemon.service"
import axios from "axios"
import MockAdapter from "axios-mock-adapter"

describe("pokemon.services test suite",() => {

    let axiosMock: MockAdapter;
    
    beforeEach(() => {
        axiosMock = new MockAdapter(axios)
    })

    it("get all pokemons returns a pokemon list when the request its succesfully", async () => {
        axiosMock.onGet().reply(200, {
            count: 1000,
            results: [{
                name: "bulbasaur",
                url: "https://pokeapi.co/api/v2/pokemon/1/"
            }]
        })
        const pokemonService = new PokemonService(axios) 
        expect(await pokemonService.getAll(10, 0)).toEqual({
            count: 1000,
            results: [{
                id: 1,
                name: "bulbasaur",
                imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/1.png"
            }]
        })
    })

})
