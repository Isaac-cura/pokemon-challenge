import { Axios } from "axios";
import { apiPaths } from "@/constants/api-paths";
import { PokemonList, PokemonListDTO } from "@/models/pokemon-list.model";
import { AsyncEither, Either, Failure, Success } from "@/models/either";
import { Pokemon, transfomPokemonDTO } from "@/models/pokemon.model";

export class PokemonService {

    constructor(private axios: Axios) { }

    async getAll(limit: number, offset: number): AsyncEither<undefined, PokemonList> {
        try {
            const response = await this.axios.get<PokemonListDTO["response"]>(apiPaths.getAllPokemons(limit, offset))
            return Success.create(await this.getPokemonListDetails(response.data))
        } catch {
            return Failure.create()
        }
    }

    private async getPokemonListDetails(dto: PokemonListDTO["response"]) {
        const { count, results } = dto;
        return {
            count,
            results: this.filterFailedPokemons(
                await Promise.all(results.map(({ name }) => this.getByName(name)))
            )
        }
    }

    private filterFailedPokemons(pokemonResponses: Either<undefined, Pokemon>[]): Pokemon[] {
        return Success.filter(pokemonResponses)
            .map(response => response.result)
    }

    async getByName(name: string, cancelable?: boolean): AsyncEither<undefined, Pokemon> {
        try {
            const response = await this.axios.get(apiPaths.getPokemonByName(name))
            return Success.create(transfomPokemonDTO(response.data))
        } catch {
            return Failure.create()
        }
    }
}