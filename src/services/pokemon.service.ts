import { Axios } from "axios";
import { apiPaths } from "@/constants/api-paths";
import { PokemonList, PokemonListDTO } from "@/models/pokemon-list.model";
import { AsyncEither, Either, Failure, Success } from "@/models/either";
import { Pokemon, transfomPokemonDTO } from "@/models/pokemon.model";

export class PokemonService {
    private controller?: AbortController;
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
        const controller = new AbortController();
        if(cancelable) {
            this.controller?.abort();
            this.controller = controller;
        }
        try {
            await delay()
            const response = await this.axios.get(apiPaths.getPokemonByName(name), {
                signal: controller.signal
            })
            return Success.create(transfomPokemonDTO(response.data))
        } catch {
            return Failure.create()
        }
    }
}

/**programatic delay to prevent flashings with the loadings */
const delay = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(undefined)
        }, 250)
    })
}