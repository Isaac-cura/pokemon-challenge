<template>
    <div class="paginator-wrapper">
        <button :class="{ active: button.active }" :disabled="button.active || !button.enabled"
            @click="() => emitChange(button.target)" v-for="(button, i) of buttons" :key="i">
            {{ button.text }}
        </button>
    </div>
</template>
<script setup lang="ts">
import { computed } from 'vue';
import { EasyPaginator } from 'easy-paginator'
import { ref, watch } from 'vue';
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
