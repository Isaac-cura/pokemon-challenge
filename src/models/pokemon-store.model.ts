import { Pokemon } from "./pokemon.model";

export interface PokemonListState {
    filters: {
        criteria: string,
        types: string[],
        experience?: number;
        moves?: number;
    },
    searchedPokemon?:Pokemon,
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