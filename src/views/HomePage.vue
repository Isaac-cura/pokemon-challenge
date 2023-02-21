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

        <pokemon-card v-for="pokemon of pokemonListStore.pokemonList" :pokemon="pokemon" :key="pokemon.name"></pokemon-card>
        <item-paginator :paginator-info="pokemonListStore.paginatorInfo" @change="paginate"></item-paginator>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/vue';
import ItemPaginator from '@/components/item-paginator.vue';
import { usePokemonListStore } from '@/stores/pokemon-list.store';
import { onMounted, toRef } from 'vue';
import PokemonCard from '@/components/pokemon-card.vue';
import { PokemonListState } from '@/models/pokemon-store.model';
const pokemonListStore = usePokemonListStore()

onMounted(() => {
  pokemonListStore.fetchAndUpdatePokemons(pokemonListStore.paginatorInfo)
})

const paginate = (pageInfo: PokemonListState["paginatorInfo"]) => {
  pokemonListStore.fetchAndUpdatePokemons(pageInfo)
}
</script>
