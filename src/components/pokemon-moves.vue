<template>
    <h2>
        {{ moveLengthLabel }}
    </h2>
    <div class="pokemon-moves" data-test="pokemon-moves">

        <div class="pokemon-move" :class="move.type" v-for="(move, i) of moves" :key="i">
            <ion-icon :src="move.icon"></ion-icon>
            <div>
                {{ move.move }}
            </div>
           
        </div>
    </div>
</template>
<script setup lang="ts">
import { pokemonTypeIcon } from '@/constants/types-icons';
import { Pokemon } from '@/models/pokemon.model';
import { computed } from 'vue';

const props = defineProps<{ pokemon: Pokemon }>()

const moves = computed(() => {
    const typesLength = props.pokemon.types.length;
    return props.pokemon.moves.map((move, i) => ({
        move,
        icon: pokemonTypeIcon(props.pokemon.types[i % typesLength]),
        type: props.pokemon.types[i % typesLength]
    }))
})
const moveLengthLabel = computed(() => {
    const movesLegth = props.pokemon.moves.length
    return movesLegth == 1
        ? "1 move"
        : `${movesLegth} moves`
})
</script>
<style scoped>
.pokemon-moves {
    display: flex;
    flex-wrap: wrap;
    gap: 30px;
    margin-top: 15px;
}
.pokemon-move ion-icon {
    border-radius: 100%;
    background: white;
    margin-top: 7px;
    font-size: 15px;
    padding: 5px;
}
.pokemon-move div {
    overflow: hidden;
    text-overflow: ellipsis;
    padding: 0px 10px;
    white-space: nowrap;
}
.pokemon-move {
    height: 64px;
    width: 100px;
    border-radius: 4px;
    text-align: center;
    color: var(--neutral-50);
    text-overflow: ellipsis;
    overflow: hidden;
}
</style>