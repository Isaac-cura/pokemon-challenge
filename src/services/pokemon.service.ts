import { Axios } from "axios";
import { apiPaths } from "@/constants/api-paths";
import { transformPokemonListDTO } from "@/models/pokemons.model";

export class PokemonService {

    constructor(private axios: Axios) { }

    async getAll(limit: number, offset: number) {
        return this.axios.get(apiPaths.getAllPokemons(limit, offset))
            .then((response) => {
                return transformPokemonListDTO(response.data)
            })
    }
}