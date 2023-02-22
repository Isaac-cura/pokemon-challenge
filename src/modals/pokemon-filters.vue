<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-button @click="closeModal">
                        <ion-icon class="primary" :icon="close"></ion-icon>
                    </ion-button>
                </ion-buttons>
            </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
            <ion-item>
                <ion-select v-model="filters.moves" placeholder="Select movement number">
                    <ion-select-option v-for="(move, i) of props.moves " :value="move" :key="i">
                        {{ move }}
                    </ion-select-option>
                </ion-select>
            </ion-item>
            <ion-item>
                <ion-select v-model="filters.experience" placeholder="Select experience level">
                    <ion-select-option v-for="(experience, i) of props.experiences " :value="experience" :key="i">
                        {{ experience }}
                    </ion-select-option>
                </ion-select>
            </ion-item>
            <ion-item>
                <ion-select :value="filters.types" placeholder="Pokemon type" :multiple="true" @ion-change="changes">
                    <ion-select-option v-for="(type, i) of props.types" :value="type" :key="i">
                        {{ type }}
                    </ion-select-option>
                </ion-select>
            </ion-item>
        </ion-content>
        <ion-footer>
            <ion-button @click="closeModal" color="medium" class="cancel">cancel</ion-button>
            <ion-button @click="submitModal">confirm</ion-button>
        </ion-footer>
    </ion-page>
</template>
<script setup lang="ts">
import { IonFooter, IonIcon, IonSelect, IonSelectOption, IonPage, IonHeader, IonToolbar, IonButtons, IonButton, IonContent, IonItem, modalController } from '@ionic/vue';
import { close } from 'ionicons/icons';
import { onMounted, reactive, ref } from 'vue';
const moves = ref()
const props = defineProps<{
    filters: {
        types: string[],
        experience: number,
        moves: number
    },
    moves: number[],
    types: string[],
    experiences: number[]
}>()

const filters = reactive(Object.assign({}, props.filters)) 
const changes = (event: CustomEvent) => {
    filters.types = event.detail.value
}

onMounted(() => {
    console.log(props)
    modalController.getTop
    moves.value = "oranges"

})

const closeModal = () => {
    modalController.dismiss()
}

const submitModal = () => {
    modalController.dismiss(filters)
}

</script>
<style scoped>
ion-page {
    --ion-background-color: var(--neutral-50)
}

ion-header {
    background-color: var(--neutral-50);
}

ion-footer {
    display: flex;
    background-color: var(--neutral-50);
}

ion-button {
    flex: 1
}

ion-header::after {
    display: none;
}

.cancel {
    --background-color: red;
}

ion-toolbar {
    --ion-toolbar-background: var(--neutral-50);
}

ion-item {
    --ion-background-color: var(--neutral-100);
    --ion-background-color: var(--neutral-100);
    --border-radius: 8px 8px 0 0;
    margin-bottom: 24px;
}

ion-select {
    --placeholder-color: var(--neutral-500);
    --placeholder-opacity: 1;
    width: 100%;
}</style>