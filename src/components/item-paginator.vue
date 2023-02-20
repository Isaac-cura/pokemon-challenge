<template>
    <div class="paginator-wrapper flex ion-justify-content-center bg-n-50"  data-test="item-paginator">
        <button class="bg-n-50" :class="{ active: button.active }" :disabled="button.active || !button.enabled"
            @click="() => emitChange(button.target)" v-for="(button, i) of buttons" :key="i">
            <ion-icon v-if="button.text === '<'" :icon="chevronBackOutline"></ion-icon>
            <ion-icon v-else-if="button.text === '>'" :icon="chevronForwardOutline"></ion-icon>
            <span v-else>{{ button.text }}</span>
        </button>
    </div>
</template>
<script setup lang="ts">
import { computed } from 'vue';
import { EasyPaginator } from 'easy-paginator'
import { ref, watch } from 'vue';
import { IonIcon } from '@ionic/vue';
import { chevronBackOutline, chevronForwardOutline } from 'ionicons/icons';

const emit = defineEmits(["change"])
const props = defineProps<{
    paginatorInfo: {
        limit: number,
        offset: number,
        count: number,
        segmentLength?: number
    }
}>()
const paginator = ref(new EasyPaginator(props.paginatorInfo))
watch(() => props.paginatorInfo, () => {
    paginator.value = new EasyPaginator(props.paginatorInfo)
})
const buttons = computed(() => {
    const buttonsCount = paginator.value.elements.length
    // removing go to first and go to back buttons
    return paginator.value.elements.slice(1, buttonsCount - 1)
})
const emitChange = (page?: number) => {
    if (typeof page === "number") {
        const newPage = paginator.value.buildTo(page)
        emit("change", {
            offset: newPage.offset,
            limit: newPage.limit,
            count: newPage.count,
            segmentLength: newPage.segmentLength
        })
    }
}
</script>
<style>
    .paginator-wrapper{
        padding: 20px;
        gap: 4px;
    }
    button{
        width: 40px;
        height: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        border-radius: 4px !important;
        overflow: hidden;
        font-size: 14px;
        font-weight: 400;
        color: var(--neutral-600)
    }
    button.active{
        background-color: var(--primary-color);
        color: var(--neutral-50);
        font-weight: 500;
    }
    ion-icon{
        color: var(--primary-color)
    }
</style>
