<template>
    <div data-test="pokemon-details">
        <div class="details ion-margin">
            <div class="flex pokemon-detail">
                <div>Height: </div>
                <div>{{ heightLabel }}</div>
            </div>
            <div class="flex pokemon-detail">
                <div>Weight:</div>
                <div>{{ weightLabel }}</div>
            </div>
            <div class="flex pokemon-detail">
                <div>Abilities: </div>
                <div>{{ abilitiesLabel }}</div>
            </div>
            <div class="flex pokemon-detail">
                <div>Experience: </div>
                <div>{{ pokemon.experience }}</div>
            </div>
            <div class="flex pokemon-detail">
                <div>Type:</div>
                <div class="flex">
                    <div class="pokemon-type" :class="type" v-for="(type, i) of pokemon.types" :key="i">{{ pokemonTypes[i] }}</div>
                </div>
            </div>
        </div>
        <div class="subtitle">
            Base stats
        </div>
        <chart-js-facade :stats="pokemon.stats"></chart-js-facade>
    </div>
</template>
<script setup lang="ts">
import { Pokemon } from '@/models/pokemon.model';
import { getHeightLabel, getWeightLabel } from '@/utils/transformers';
import { capitalize } from 'vue';
import ChartJsFacade from '@/components/chart-js-facade.vue';

const props = defineProps<{ pokemon: Pokemon }>()
const heightLabel = getHeightLabel(props.pokemon.height)
const weightLabel = getWeightLabel(props.pokemon.weight)
const abilitiesLabel = props.pokemon.abilities.map((ability) => capitalize(ability)).join(", ")
const pokemonTypes = props.pokemon.types.map(type => capitalize(type))

</script>
<style scoped>
.pokemon-detail{
    margin-bottom: 16px;
}
.pokemon-detail>div:nth-child(1){
    width: 100px;
}
.pokemon-detail>div:nth-child(2){
    color: var(--neutral-800);
    font-weight: 500;
}

.subtitle{
    margin-top: 44px;
    margin-bottom: 22px;
}

</style>