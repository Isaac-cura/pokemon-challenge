<template>
    <ion-header>
        <ion-toolbar>
            <ion-title>
                <div class="title-wrapper">
                    <h2 class="n-50">What pokemon are you looking for?</h2>
                </div>
            </ion-title>
        </ion-toolbar>
        <ion-toolbar>
            <div class="ion-margin-start">
                <ion-item>
                    <ion-input v-model="criteria" ref="input" :debounce="500" @ion-change="emitChange"></ion-input>
                    <ion-buttons slot="end">
                        <ion-button v-if="!criteria" @click="focusInput">
                            <ion-icon :icon="search" slot="end"></ion-icon>
                        </ion-button>
                        <ion-button v-else @click="clearInput">
                            <ion-icon :icon="close" slot="end"></ion-icon>
                        </ion-button>
                    </ion-buttons>
                </ion-item>
            </div>
            <ion-buttons class="ion-margin-horizontal" slot="end">
                <ion-button @click="emitToggle">
                    <ion-icon src="assets/icons/menu.svg"></ion-icon>
                </ion-button>
            </ion-buttons>
        </ion-toolbar>
    </ion-header>
</template>
<script setup lang="ts">
import { IonHeader, IonToolbar, IonTitle, IonInput, IonIcon, IonButton, IonButtons, IonItem } from '@ionic/vue';
import { search, close } from 'ionicons/icons';
import { ref } from 'vue';
const emit = defineEmits(["change", "toggle"])
const input = ref();
const criteria = ref("");
const emitChange = (event: CustomEvent) => {
    emit("change", event.detail.value)
}

const clearInput = () => {
    criteria.value = ""
}
const focusInput = () => {
    input.value.$el.setFocus()
}
const emitToggle = () => {
    emit("toggle")
}
</script>
<style scoped>
ion-header {
    background-color: #072AC8;
    --ion-toolbar-background: transparent;
    padding-top: 70px;
}

ion-header::before {
    background-image: url('/public/assets/half-pokeball.png');
    background-repeat: no-repeat;
    background-position: 100% 50%;
    filter: brightness(0.5) saturate(.3);
    content: "";
    position: absolute;
    top: 0px;
    right: 0px;
    bottom: 0px;
    left: 0px;
    opacity: 0.3;
}

.title-wrapper {
    max-width: 240px;
    white-space: pre-line;
}

ion-item {
    --background: transparent;
    --border-color: var(--neutral-300);
    --border-width: 0px 0px 2px;
    --color: var(--neutral-300);
    --highlight-color-focused: var(--neutral-100)
}
</style>