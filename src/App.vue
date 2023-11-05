<template>
  <router-view />
</template>

<script setup lang="ts">
import { onMounted, watch } from 'vue'
import { usePanelStore } from './stores/panel-store'
import { useFilteringStore } from './stores/filtering-store'
import { useBufferStore } from './stores/buffer-store'
import { useModalsStore } from './stores/modals-store'

const panelStore = usePanelStore()
const filteringStore = useFilteringStore()
const bufferStore = useBufferStore()
const modalsStore = useModalsStore()

onMounted(() => panelStore.getData())

watch(() => filteringStore.selectFilter, () => {
  bufferStore.projectsFilter
    .forEach((option, index) => filteringStore.activateFilter(++index))
})

watch(() => modalsStore.modalAddCard.isOpen || modalsStore.modalEditCard.isOpen, () => {
  filteringStore.selectFilter = 'Не выбрано'
})
</script>
