<template>
  <ion-page>
    <list-header :pokemon-name="pokemonListStore.filters.criteria" @change="searchByName" @toggle="openModal" class="ion-margin-bottom" />
    <ion-content :fullscreen="true" class="flex">
      <div class="flex-wrapper">
        <div class="loading" v-if="pokemonListStore.loading">
          <img src="assets/loading.gif" alt="">
        </div>
        <div class="error" v-else-if="pokemonListStore.error">
          <img src="assets/pikachu.png" alt="">
          We didn't find any results for you
          <ion-button @click="clearFilters">return</ion-button>
        </div>
        <div class="filtered-results readex n-600" v-else-if="resultsMessage">
          {{ resultsMessage }} <ion-icon class="close" @click="clearFilters" :icon="close"></ion-icon>
        </div>
        <div class="flex pokemon-cards-container" v-if="showPaginator">
          <pokemon-card class="pokemon-cards" @click="goToDetails" v-for="pokemon of pokemonListStore.pokemonList"
            :pokemon-count="pokemonListStore.paginatorInfo.count" :pokemon="pokemon" :key="pokemon.name">
          </pokemon-card>
        </div>
        <div class="disclaimer" v-if="pokemonListStore.thereAreFilters">
          Filtering is done under the current page due to api limitations
        </div>
        <item-paginator v-show="showPaginator" :paginator-info="pokemonListStore.paginatorInfo"
          @change="paginate"></item-paginator>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonContent, IonPage, modalController, IonIcon, IonButton } from '@ionic/vue';
import ItemPaginator from '@/components/item-paginator.vue';
import { clearFiltersAndErrors, usePokemonListStore } from '@/stores/pokemon-list.store';
import { onMounted } from 'vue';
import PokemonCard from '@/components/pokemon-card.vue';
import { PokemonListState } from '@/models/pokemon-store.model';
import { Pokemon } from '@/models/pokemon.model';
import { useRouter } from 'vue-router';
import ListHeader from '@/components/list-header.vue'
import PokemonFilters from '@/modals/pokemon-filters.vue';
import { computed } from 'vue';
import { getResultsMessage } from '@/utils/transformers';
import { close } from 'ionicons/icons';

const pokemonListStore = usePokemonListStore()
const router = useRouter()
onMounted(() => {
  pokemonListStore.fetchAndUpdatePokemons(pokemonListStore.paginatorInfo)
})

const paginate = (pageInfo: PokemonListState["paginatorInfo"]) => {
  pokemonListStore.fetchAndUpdatePokemons(pageInfo)
}
const goToDetails = (pokemon: Pokemon) => {
  router.push(`/pokemon/${pokemon.name}`)
}
const searchByName = (name: string) => {
  pokemonListStore.fetchPokemonByName(name)
}

const showPaginator = computed(() => {
  return !pokemonListStore.loading && !pokemonListStore.error
})

const resultsMessage = computed(() => {
  if (pokemonListStore.thereAreFilters || pokemonListStore.filters.criteria) {
    return getResultsMessage(pokemonListStore.pokemonResultCount)
  }
  return undefined
})

const clearFilters = () => {
  clearFiltersAndErrors()

}

const openModal = async () => {
  const modal = await modalController.create({
    component: PokemonFilters,
    componentProps: pokemonListStore.filtersData
  });
  await modal.present();
  const filters = await modal.onDidDismiss()
  if (filters.data) {
    pokemonListStore.setFilters(filters.data)
  }
}
</script>
<style scoped>
.pokemon-cards-container {
  justify-content: center;
  flex-wrap: wrap;
  flex: 1;
  align-items: baseline;
  align-content: baseline;
  padding-left: 15px;
  padding-right: 15px;
  width: 100%;
}

.pokemon-cards {
  margin-bottom: 16px;
  width: 100%;
}

.flex-wrapper {
  display: flex;
  height: 100%;
  width: 100%;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}

.loading {
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  justify-self: center;
}

.error {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 26px;
  font-weight: bold;
  text-align: center;
  padding: 0px 34px;
  width: 300px;
}

.error>img {
  opacity: 0.5;
  max-width: 100%;
  width: 241px;
  filter: drop-shadow(-5px -11px 10px black);
  margin-bottom: 40px;
}

.pokemon-cards-container {
  flex: 1
}

.filtered-results {
  background-color: var(--neutral-50);
  padding: 20px;
  border-radius: 4px;
  width: 300px;
}

.filtered-results ion-icon {
  float: right;
  color: var(--neutral-600);
  font-size: 20px;
  clear: both;
}

@media (min-width: 600px) {
  .pokemon-cards {
    max-width: 300px;
  }
}
</style>