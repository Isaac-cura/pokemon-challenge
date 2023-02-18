import { Axios } from "axios";
import { apiPaths } from "@/constants/api-paths";
import { PokemonList, transformPokemonListDTO } from "@/models/pokemons.model";
import { AsyncEither, Failure, Success } from "@/models/either";

export class PokemonService {

    constructor(private axios: Axios) { }

    async getAll(limit: number, offset: number): AsyncEither<undefined, PokemonList> {
        try {
            const response = await this.axios.get(apiPaths.getAllPokemons(limit, offset))
            return Success.create(transformPokemonListDTO(response.data))
        } catch {
            return Failure.create() 
        }
    }
}