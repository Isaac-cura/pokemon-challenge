<template>
    <ion-modal ref="modal" trigger="open-modal">
        <ion-header>
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-button @click="cancel()">Cancel</ion-button>
                </ion-buttons>
                <ion-title>Welcome</ion-title>
                <ion-buttons slot="end">
                    <ion-button :strong="true" @click="confirm()">Confirm</ion-button>
                </ion-buttons>
            </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
            <ion-item>
                <ion-label position="stacked">Enter your name</ion-label>
                <ion-input ref="input" type="text" placeholder="Your name"></ion-input>
            </ion-item>
        </ion-content>
    </ion-modal>
</template>
<script setup lang="ts">
const cancel = () => {return 5}
const confirm = () => {return 7}
</script>
