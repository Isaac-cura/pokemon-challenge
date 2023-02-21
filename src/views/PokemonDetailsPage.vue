<template>
    <ion-page>
        <ion-content>
            <ion-header :translucent="true">
                <ion-toolbar>
                    <ion-buttons slot="start">
                        <ion-back-button defaultHref="/home"></ion-back-button>
                    </ion-buttons>
                </ion-toolbar>
                <h1 class="n-800 center">{{ pokemonNameCapitalized }} <span>#{{ pokemonId }}</span></h1> 
                <ion-img :src="activePokemon?.imageUrl" />
            </ion-header>
            <ion-segment :value="pokemonDetailStore.activeTab" @ion-change="changeTab">
                <ion-segment-button value="about">
                    <span>
                        About
                    </span>
                </ion-segment-button>
                <ion-segment-button value="moves">
                    <span>
                        Moves
                    </span>
                </ion-segment-button>
            </ion-segment>
            <div v-if="activePokemon" class="ion-padding">
                <pokemon-details class="pokemon-details" :pokemon="activePokemon"
                    v-if="pokemonDetailStore.activeTab === 'about'" />
                <pokemon-moves v-else-if="pokemonDetailStore.activeTab === 'moves'" />
            </div>
        </ion-content>
    </ion-page>
</template>
<script setup lang="ts">
import { usePokemonDetailStore } from '@/stores/pokemon-detail.store';
import { onMounted, computed, capitalize } from 'vue';
import { useRoute } from 'vue-router';
import { IonContent, IonHeader, IonToolbar, IonImg, IonSegment, IonSegmentButton, IonButtons, IonBackButton, IonPage } from '@ionic/vue';
import PokemonDetails from '@/components/pokemon-details.vue';
import PokemonMoves from '@/components/pokemon-moves.vue'
import { usePokemonListStore } from '@/stores/pokemon-list.store';
import { addZerosToId } from '@/utils/transformers';

const route = useRoute()
const pokemonName: string = route.params.name as string;
const pokemonDetailStore = usePokemonDetailStore()
const pokemonListStore = usePokemonListStore()
const pokemonCount = pokemonListStore.paginatorInfo.count;

const activePokemon = computed(() => pokemonDetailStore.getIfActive(pokemonName))
const pokemonId = computed(() => addZerosToId(activePokemon.value?.id ?? 0, pokemonCount))
onMounted(() => {
    pokemonDetailStore.setActivePokemon(pokemonName)
})


const pokemonNameCapitalized = computed(() => capitalize(pokemonDetailStore.activePokemon?.name ?? ''))

function changeTab(event: CustomEvent) {
    const tab = event.detail.value;
    pokemonDetailStore.setActiveTab(tab)

}
</script>
<style>
ion-content {
    --ion-background-color: white;
}

ion-header {
    --ion-background-color: var(--neutral-100);
    background-color: var(--neutral-100);
    padding-bottom: 23px;
}

ion-segment {
    margin-bottom: 30px;
    width: 50%;
    margin-top: 20px;

}

ion-segment-button {
    --color-checked: #4361EE;
    text-transform: capitalize;
    font-family: 'Readex Pro';
    font-weight: 500;
    font-size: 16px;
}

h1 span{
    font-weight: 500;
    font-size: 16px;
}

.pokemon-details {
    margin-bottom: 50px;
}
</style>