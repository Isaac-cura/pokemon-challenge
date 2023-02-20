import 'pinia'
import { PokemonService } from "./services/pokemon.service";

declare module 'pinia' {
    export interface PiniaCustomProperties{
        $pokemonService: PokemonService
    }
}