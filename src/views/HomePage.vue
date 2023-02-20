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
      <div>

        <pokemon-card v-for="pokemon of pokemonPageStore.pokemonList" :pokemon="pokemon" :key="pokemon.name"></pokemon-card>
        <item-paginator :paginator-info="pokemonPageStore.paginatorInfo" @change="paginate"></item-paginator>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/vue';
import ItemPaginator from '@/components/item-paginator.vue';
import { usePokemonPageStore } from '@/stores/pokemon-page.store';
import { onMounted, toRef } from 'vue';
import PokemonCard from '@/components/pokemon-card.vue';
import { PokemonsPageState } from '@/models/pokemon-store.model';
const pokemonPageStore = usePokemonPageStore()

onMounted(() => {
  pokemonPageStore.fetchAndUpdatePokemons(pokemonPageStore.paginatorInfo)
})

const paginate = (pageInfo: PokemonsPageState["paginatorInfo"]) => {
  pokemonPageStore.fetchAndUpdatePokemons(pageInfo)
}
</script>
