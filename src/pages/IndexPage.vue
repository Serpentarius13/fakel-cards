<template>
  <q-page class="bg-secondary container">
    <SectionHeader />
    <SectionPanel />
    <ModalAdd />
    <ModalEdit />
  </q-page>
</template>

<script setup lang="ts">
import SectionHeader from 'src/components/SectionHeader.vue'
import SectionPanel from 'src/components/SectionPanel.vue'
import ModalAdd from 'src/components/ModalAdd.vue'
import ModalEdit from 'src/components/ModalEdit.vue'
</script>
