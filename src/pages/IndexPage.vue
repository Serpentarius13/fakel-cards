<template>
  <q-page class="bg-secondary container">
    <SectionHeader />
    <SectionPanel />
    <ModalAdd />
    <ModalEdit />
  </q-page>
</template>

<script setup lang="ts">
import { watch } from 'vue'
import { useFilteringStore } from '../stores/filtering-store'
import { useBufferStore } from '../stores/buffer-store'
import { useModalsStore } from '../stores/modals-store'
import SectionHeader from 'src/components/SectionHeader.vue'
import SectionPanel from 'src/components/SectionPanel.vue'
import ModalAdd from 'src/components/ModalAdd.vue'
import ModalEdit from 'src/components/ModalEdit.vue'

const filteringStore = useFilteringStore()
const bufferStore = useBufferStore()
const modalsStore = useModalsStore()

watch(() => filteringStore.selectFilter, () => {
  bufferStore.projectsFilter
    .forEach((option, index) => filteringStore.activateFilter(++index))
})

watch(() => modalsStore.modalAddCard.isOpen || modalsStore.modalEditCard.isOpen, () => {
  filteringStore.selectFilter = 'Не выбрано'
})
</script>
