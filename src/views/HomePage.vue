<template>
  <ion-page>
    <list-header @change="searchByName" @toggle="openModal" class="ion-margin-bottom" />
    <ion-content :fullscreen="true">
      <div class="flex pokemon-cards-container">
        <pokemon-card class="pokemon-cards" @click="goToDetails" v-for="pokemon of pokemonListStore.pokemonList"
          :pokemon-count="pokemonListStore.paginatorInfo.count" :pokemon="pokemon" :key="pokemon.name">
        </pokemon-card>
      </div>
      <item-paginator :paginator-info="pokemonListStore.paginatorInfo" @change="paginate"></item-paginator>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonContent, IonPage, modalController } from '@ionic/vue';
import ItemPaginator from '@/components/item-paginator.vue';
import { usePokemonListStore } from '@/stores/pokemon-list.store';
import { onMounted } from 'vue';
import PokemonCard from '@/components/pokemon-card.vue';
import { PokemonListState } from '@/models/pokemon-store.model';
import { Pokemon } from '@/models/pokemon.model';
import { useRouter } from 'vue-router';
import ListHeader from '@/components/list-header.vue'
import PokemonFilters from '@/modals/pokemon-filters.vue';

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

const openModal = async () => {
  const modal = await modalController.create({
      component: PokemonFilters,
    });
    await modal.present();
}
</script>
<style scoped>
.pokemon-cards-container {
  justify-content: center;
  flex-wrap: wrap;
}

.pokemon-cards {
  margin-bottom: 16px;
  width: 100%;
}

@media (min-width: 600px) {
  .pokemon-cards {
    max-width: 300px;
  }
}
</style>