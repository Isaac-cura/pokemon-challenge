import { defineStore } from "pinia";
import { PokemonDetailState, PokemonDetailTab } from "@/models/pokemon-detail-store.model";
import { usePokemonListStore } from "@/stores/pokemon-list.store";

export const usePokemonDetailStore = defineStore("pokemon-detail", {
    state: ():PokemonDetailState =>  ({
        activePokemon: undefined,
        loading: false,
        error: false,
        activeTab: "about"
    }),
    getters: {
        getIfActive: (state) => (pokemonName: string) => {
            const {activePokemon} = state;
            return activePokemon?.name === pokemonName
            ? activePokemon
            : undefined;
        }
    },
    actions: {
        async setActivePokemon(pokemonName: string) {
            const pokemonInList = pokemonFromList(pokemonName)
            if(!isActivePokemon(pokemonName) && !pokemonInList) {
                this.loading = true;
                const response =  await this.$pokemonService.getByName(pokemonName);
                this.loading = false;
                this.error = response.failed;
                if(response.succeeded) {
                    this.activePokemon = response.result
                }
            } else if(pokemonInList) {
                this.activePokemon = pokemonInList
            }
        },
        async setActiveTab(tab: PokemonDetailTab) {
            this.activeTab = tab;
        }
    }
})

const pokemonFromList = (pokemonName: string) => {
    const porkemonPageStore = usePokemonListStore()
    return porkemonPageStore.pokemons[pokemonName]
}

const isActivePokemon = (pokemonName: string) => {
    const pokemonDetailStore = usePokemonDetailStore()
    return pokemonDetailStore.activePokemon?.name === pokemonName
}