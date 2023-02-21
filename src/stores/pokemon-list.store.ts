import { PokemonList } from "@/models/pokemon-list.model";
import { PokemonListState } from "@/models/pokemon-store.model";
import { Pokemon } from "@/models/pokemon.model";
import { PaginatorDataSource } from "easy-paginator";
import { defineStore } from "pinia";

export const usePokemonListStore = defineStore("pokemon-list", {
    state: (): PokemonListState => ({
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
            const pokemonsResponse = await this.$pokemonService.getAll(limit ?? 0, offset ?? 0)
            if (pokemonsResponse.succeeded) {
                handleSuccessfullyPokemonListRequest(pokemonsResponse.result, paginatorInfo)
            } else {
                setFailedRequest()
            }
        },

    }
})




const handleSuccessfullyPokemonListRequest = (pokemonList: PokemonList, paginator: PaginatorDataSource) => {
    const pokemonListStore = usePokemonListStore()
    setSuccessRequest();
    pokemonListStore.pokemons = arrayToPokemonsObject(pokemonList.results)
    updateStatePaginator(paginator, pokemonList.count)

}

const setSuccessRequest = () => {
    const pokemonListStore = usePokemonListStore()
    pokemonListStore.error = false;
    pokemonListStore.loading = false;
}

const setFailedRequest = () => {
    const pokemonListStore = usePokemonListStore()
    pokemonListStore.error = true;
    pokemonListStore.loading = false;
}

const updateStatePaginator = (paginator: PaginatorDataSource, count: number) => {
    const pokemonListStore = usePokemonListStore()
    pokemonListStore.paginatorInfo = {
        ...pokemonListStore.paginatorInfo,
        ...paginator,
        count
    }
}

/**in states its better store plain objects over arrays */
const arrayToPokemonsObject = (pokemons: Pokemon[]) => {
    return pokemons.reduce((pokemonsObject, currentPokemon) => ({
        ...pokemonsObject,
        [currentPokemon.name]: currentPokemon
    }), {})
}