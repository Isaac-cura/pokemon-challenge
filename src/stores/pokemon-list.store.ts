import { PokemonList } from "@/models/pokemon-list.model";
import { PokemonListState } from "@/models/pokemon-store.model";
import { Pokemon } from "@/models/pokemon.model";
import { PaginatorDataSource } from "easy-paginator";
import { defineStore } from "pinia";

export const usePokemonListStore = defineStore("pokemon-list", {
    state: (): PokemonListState => ({
        filters: {
            criteria: "",
            types: [],
            experience: undefined,
            moves: undefined
        },
        searchedPokemon: undefined,
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
        pokemonResultCount: (): number => {
            const pokemonListStore = usePokemonListStore()
            return pokemonListStore.pokemonList.length
        },
        thereAreFilters: (state): boolean => {
            const { types, experience, moves } = state.filters
            return types.length > 0 || typeof experience !== "undefined" || typeof moves !== "undefined" 
        },
        pokemonList: (state): Pokemon[] => {
            const criteria = state.filters.criteria;
            if (criteria) {
                return [state.searchedPokemon].filter((pokemon): pokemon is Pokemon => pokemon?.name === criteria)
            }
            const pokemons = Object.values(state.pokemons);
            return [filterByExperience, filterByTypes, filterByMoves]
                .reduce((pokemons, filter) => filter(pokemons), pokemons)
        },
        filtersData: (state) => {
            const pokemons = Object.values(state.pokemons);
            const moves = pokemons.reduce((moves: number[], pokemon: Pokemon) => [...moves, pokemon.moves.length], [])
            const experiences = pokemons.reduce((experiences: number[], pokemon: Pokemon) => [...experiences, pokemon.experience], [])
            const types = pokemons.reduce((types: string[], pokemon: Pokemon) => [...types, ...pokemon.types], [])
            return {
                filters: state.filters,
                experiences: [...(new Set(experiences))],
                moves: [...(new Set(moves))],
                types: [...(new Set(types))],

            }
        }
    },

    actions: {
        async fetchAndUpdatePokemons(paginatorInfo: PaginatorDataSource) {
            clearFiltersAndErrors()
            const { limit, offset } = paginatorInfo;
            this.loading = true;
            const pokemonsResponse = await this.$pokemonService.getAll(limit ?? 0, offset ?? 0)
            if (pokemonsResponse.succeeded) {
                handleSuccessfullyPokemonListRequest(pokemonsResponse.result, paginatorInfo)
            } else {
                setFailedRequest()
            }
        },
        async fetchPokemonByName(pokemonName: string) {
            clearFiltersAndErrors()
            this.filters.criteria = pokemonName
            const pokemon = pokemonFromList(pokemonName)
            if (typeof pokemon === "undefined" && pokemonName) {
                this.searchedPokemon = undefined;
                this.loading = true
                const response = await this.$pokemonService.getByName(pokemonName)
                if (response.succeeded) {
                    this.searchedPokemon = response.result
                    setSuccessRequest()
                } else {
                    setFailedRequest()
                }
            } else {
                this.searchedPokemon = pokemon;
            }
        },
        setFilters(filters: { moves: number, types: string[], experience: number }) {
            this.filters = {
                ...this.filters,
                moves: filters.moves,
                types: filters.types,
                experience: filters.experience
            }
        }

    }
})

export const clearFiltersAndErrors = () => {
    const porkemonPageStore = usePokemonListStore()
    porkemonPageStore.error = false
    porkemonPageStore.filters.criteria = ""
    porkemonPageStore.filters.experience = undefined;
    porkemonPageStore.filters.moves = undefined;
    porkemonPageStore.filters.types = []
}

export const pokemonFromList = (pokemonName: string) => {
    const porkemonPageStore = usePokemonListStore()
    return porkemonPageStore.pokemons[pokemonName]
}
export const filterByExperience = (pokemons: Pokemon[]): Pokemon[] => {
    const porkemonPageStore = usePokemonListStore()
    const experience = porkemonPageStore.filters.experience;
    if (typeof experience === "undefined") {
        return pokemons;
    }
    return pokemons.filter(pokemon => pokemon.experience === experience)
}

export const filterByMoves = (pokemons: Pokemon[]): Pokemon[] => {
    const porkemonPageStore = usePokemonListStore();
    const moves = porkemonPageStore.filters.moves;
    if (typeof moves === "undefined") {
        return pokemons;
    }
    return pokemons.filter(pokemon => pokemon.moves.length === moves)
}

const filterByTypes = (pokemons: Pokemon[]): Pokemon[] => {
    const porkemonPageStore = usePokemonListStore()
    const types = porkemonPageStore.filters.types
    if (types.length === 0) {
        return pokemons;
    }
    return pokemons.filter(pokemon =>
        pokemon.types.some(type => types.includes(type)))
}


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