<template>
  <ion-card>
    <ion-img :src="pokemon?.imageUrl" alt="pokemon image" />
    <ion-card-header>
      <ion-card-title>{{ pokemon?.name }}</ion-card-title>
      <ion-card-subtitle># {{ pokemon?.id }}</ion-card-subtitle>
    </ion-card-header>
    <ion-card-content>
      <div>
        Moves <span>{{ pokemon?.moves.length }}</span>
      </div>
      <div>
        Experience <span>{{ pokemon?.experience }}</span>
      </div>
    </ion-card-content>
    <ion-chip v-for="(pokemonType, index) of pokemonTypes" :key="index">
      <ion-icon :src="pokemonType.icon"></ion-icon>{{ pokemonType.type }}
    </ion-chip>
  </ion-card>
</template>
<script lang="ts" setup>
import {
  IonImg,
  IonCard,
  IonChip,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent
} from '@ionic/vue';
import { capitalize, computed } from 'vue';
import { Pokemon } from '@/models/pokemon.model';
import { pokemonTypeIcon } from '@/constants/types-icons'

const props = defineProps<{ pokemon?: Pokemon }>()
const pokemonTypes = computed(() => props.pokemon?.types.map((type) => ({
  icon: pokemonTypeIcon(type),
  type: capitalize(type)
})))
</script>
<style>
ion-img {
  height: 170px;
  margin-top: -10px;
  background-color: #ECECF2;
}
</style>
