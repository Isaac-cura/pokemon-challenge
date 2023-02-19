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
    <ion-chip v-for="(pokemonType, index) of pokemon?.types" :key="index">
      {{ pokemonType }}
    </ion-chip>
  </ion-card>
</template>
<script lang="ts" setup>
import { Pokemon } from '@/models/pokemon.model';
import { IonImg } from '@ionic/vue';
import { IonCard, IonChip } from '@ionic/vue';
import { IonCardHeader } from '@ionic/vue';
import { IonCardTitle } from '@ionic/vue';
import { IonCardSubtitle } from '@ionic/vue';
import { IonCardContent } from '@ionic/vue';

const props = defineProps<{ pokemon?: Pokemon }>()
</script>
<style>
ion-img {
  height: 170px;
  margin-top: -10px;
  background-color: #ECECF2;
}
</style>
