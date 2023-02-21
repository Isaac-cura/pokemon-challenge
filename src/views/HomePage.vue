<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>Blank</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Blank</ion-title>
        </ion-toolbar>
      </ion-header>
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
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/vue';
import ItemPaginator from '@/components/item-paginator.vue';
import { usePokemonListStore } from '@/stores/pokemon-list.store';
import { onMounted } from 'vue';
import PokemonCard from '@/components/pokemon-card.vue';
import { PokemonListState } from '@/models/pokemon-store.model';
import { Pokemon } from '@/models/pokemon.model';
import { useRouter } from 'vue-router';

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
</script>
<style scoped>
.pokemon-cards-container{
  justify-content: center;
  flex-wrap: wrap;
  gap: 50px;
}
.pokemon-cards{
  margin-bottom: 16px;
  width: 100%;
}

@media (min-width: 600px) {
  .pokemon-cards{
    max-width: 300px;
  }
}
</style>