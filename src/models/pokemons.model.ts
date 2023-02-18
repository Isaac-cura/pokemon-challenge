import { apiPaths } from "@/constants/api-paths";

export interface PokemonListDTO {
    response: {
        count: number;
        previous?: string;
        next?: string;
        results: PokemonItemDTO[]
    }
}

interface PokemonItemDTO {
    name: string,
    url: string
}

export interface PokemonList {
    count: number;
    results: PokemonItem[]
}

export interface PokemonItem {
    id: number,
    name: string,
    imageUrl: string
}

export const transformPokemonListDTO = (pokemonListDTO: PokemonListDTO['response']): PokemonList => ({
    count: pokemonListDTO.count,
    results: pokemonListDTO.results.map(pokemonItemDTO => {
        const id = getPokemonIdFromUrl(pokemonItemDTO.url);
        return {
            id,
            name: pokemonItemDTO.name,
            imageUrl: apiPaths.pokemonImage(id)
        }
    })
});

const getPokemonIdFromUrl = (pokemonUrl: string) => parseInt(pokemonUrl.split("/").reverse()[1]);




