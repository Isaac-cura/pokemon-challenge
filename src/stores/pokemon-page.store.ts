import { PokemonsPageState } from "@/models/pokemon-store.model";
import { Pokemon } from "@/models/pokemon.model";
import { EasyPaginator, PaginatorDataSource } from "easy-paginator";
import { defineStore } from "pinia";

export const usePokemonPageStore = defineStore("pokemon-page", {
    state: (): PokemonsPageState => ({
        pokemons: {},
        paginatorInfo: {
            count: 0,
            offset: 0,
            limit: 5,
            segmentLength: 5
        },
        loading: false,
        error: false
    }),
    getters: {
        pokemonList: (state) => Object.values(state.pokemons)
    },
    actions: {
        async fetchAndUpdatePokemons(paginatorInfo: PaginatorDataSource) {
            const {limit, offset} = paginatorInfo;
            this.loading = true;
            const pokemonsResponse = await this.$pokemonService.getAll(limit!, offset!)
            if(pokemonsResponse.succeeded) {
                this.error = false;
                this.loading = false;
                const fetchedPokemons = pokemonsResponse.result.results;                
                this.pokemons = arrayToPokemonsObject(fetchedPokemons)
                Object.assign(this.paginatorInfo, {
                    ...paginatorInfo,
                    count: pokemonsResponse.result.count
                })
            } else {
                this.loading = false;
                this.error = true;
            }
        },
        
    }
})

/**in states its better store plain objects over arrays */
const arrayToPokemonsObject = (pokemons: Pokemon[]) =>  {
    return pokemons.reduce((pokemonsObject, currentPokemon) =>({
        ...pokemonsObject,
        [currentPokemon.name]: currentPokemon
    }) , {})
}