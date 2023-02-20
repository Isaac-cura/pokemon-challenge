<template>
  <ion-card @click="onClick" data-test="pokemon-card">
    <ion-img :src="pokemon.imageUrl" alt="pokemon image" />
    <ion-card-header>
      <ion-card-title>
        <h2>{{ pokemonName }}</h2>
      </ion-card-title>
      <ion-card-subtitle class="text-s n-500">
        # {{ pokemonId }}
      </ion-card-subtitle>
    </ion-card-header>
    <ion-card-content class="ion-no-padding ion-margin-horizontal flex ion-justify-content-start">
      <div class="text-s ion-margin-end">
        Moves <span class="n-800">{{ pokemon.moves.length }}</span>
      </div>
      <div class="text-s">
        Experience <span class="n-800">{{ pokemon.experience }}</span>
      </div>

    </ion-card-content>
    <div class="ion-margin">
      <ion-chip class="chip text-s" v-for="(pokemonType, index) of pokemonTypes" :key="index">
        <ion-icon :src="pokemonType.icon"></ion-icon>{{ pokemonType.type }}
      </ion-chip>
    </div>
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
  IonCardContent,
  IonIcon
} from '@ionic/vue';
import { capitalize, computed } from 'vue';
import { Pokemon } from '@/models/pokemon.model';
import { pokemonTypeIcon } from '@/constants/types-icons'
const props = withDefaults(defineProps<{ pokemon: Pokemon, pokemonCount?: number }>(), {
  pokemonCount: 0
})
const emit = defineEmits(["click"])

const pokemonTypes = computed(() => props.pokemon.types.map((type) => ({
  icon: pokemonTypeIcon(type),
  type: capitalize(type)
})))

const pokemonName = computed(() => capitalize(props.pokemon.name))

const pokemonId = computed(() => {
  const minZeroPokemonCount = Math.max(0, props.pokemonCount)
  const pokemonIdLength = props.pokemon.id.toString().length
  const pokemonCountLength = minZeroPokemonCount.toString().length ?? pokemonIdLength;
  const missingCharacters = Math.max(0, pokemonCountLength - pokemonIdLength) 
  return "0".repeat(missingCharacters) + props.pokemon.id
})

const onClick = () => {
  emit("click", props.pokemon)
}
</script>
<style>
ion-img {
  height: 170px;
  margin-top: -10px;
  background-color: var(--neutral-100);
}

ion-card {
  border-radius: 16px;
}
</style>
