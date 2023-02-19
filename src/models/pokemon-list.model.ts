import { apiPaths } from "@/constants/api-paths";
import { Pokemon } from "./pokemon.model";

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
    results: Pokemon[]
}


export interface PokemonItem {
    id: number,
    name: string,
    imageUrl: string
}



