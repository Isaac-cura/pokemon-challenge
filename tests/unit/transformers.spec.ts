import { apiPaths } from "@/constants/api-paths"
import { PokemonListDTO, transformPokemonListDTO } from "@/models/pokemons.model"

describe("test suite for the model transformers", () => {
    let pokemonListDTOResponse: PokemonListDTO['response'] = {
        count: 100,
        results: [{
            name: "bulbasaur",
            url: "https://pokeapi.co/api/v2/pokemon/1/"
        }]
    }

    it("PokemonListDTOTransformer returns a PokemonList with PokemonItems", () => {
        const pokemonList = transformPokemonListDTO(pokemonListDTOResponse)
        expect(Object.keys(pokemonList)).toEqual(["count", "results"])
        pokemonList.results.forEach(pokeItem => {
            expect(Object.keys(pokeItem)).toEqual(["id", "name", "imageUrl"])
        })
    })
    
    it("PokemonListDTOTransformer transform PokemonItem properly", () => {
        const pokemonList = transformPokemonListDTO(pokemonListDTOResponse)
        const pokemonItem = pokemonList.results[0]
        expect(pokemonItem).toEqual({
            id: 1,
            name: "bulbasaur",
            imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/1.png"
        })
    })

})