import { PokemonList } from "@/models/pokemon-list.model";
import { PokemonsPageState } from "@/models/pokemon-store.model";
import { Pokemon } from "@/models/pokemon.model";
import { PaginatorDataSource } from "easy-paginator";
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
            const { limit, offset } = paginatorInfo;
            this.loading = true;
            const pokemonsResponse = await this.$pokemonService.getAll(limit!, offset!)
            if (pokemonsResponse.succeeded) {
                handleSuccessfullyPokemonListRequest(pokemonsResponse.result, paginatorInfo)
            } else {
                setFailedRequest()
            }
        },
    }
})


const handleSuccessfullyPokemonListRequest = (pokemonList: PokemonList, paginator: PaginatorDataSource) => {
    const pokemonPageStore = usePokemonPageStore()
    setSuccessRequest();
    pokemonPageStore.pokemons = arrayToPokemonsObject(pokemonList.results)
    updateStatePaginator(paginator, pokemonList.count)

}

const setSuccessRequest = () => {
    const pokemonPageStore = usePokemonPageStore()
    pokemonPageStore.error = false;
    pokemonPageStore.loading = false;
}

const setFailedRequest = () => {
    const pokemonPageStore = usePokemonPageStore()
    pokemonPageStore.error = true;
    pokemonPageStore.loading = false;
}

const updateStatePaginator = (paginator: PaginatorDataSource, count: number) => {
    const pokemonPageStore = usePokemonPageStore()
    Object.assign(pokemonPageStore.paginatorInfo, {
        ...paginator,
        count
    })
}

/**in states its better store plain objects over arrays */
const arrayToPokemonsObject = (pokemons: Pokemon[]) => {
    return pokemons.reduce((pokemonsObject, currentPokemon) => ({
        ...pokemonsObject,
        [currentPokemon.name]: currentPokemon
    }), {})
}