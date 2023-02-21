import { Pokemon } from "./pokemon.model";

export type PokemonDetailTab = "about" | "moves";

export interface PokemonDetailState{
    activePokemon?: Pokemon;
    loading: boolean;
    error: boolean;
    activeTab: PokemonDetailTab
}