import { Pokemon } from "./pokemon.model";

export interface PokemonsPageState {
    pokemons: {
        [k: string]: Pokemon;
    };
    paginatorInfo: {
        count: number;
        offset: number;
        limit: number;
        segmentLength: number;
    };
    loading: boolean;
    error: boolean;
}