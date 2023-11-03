<template>
  <router-view />
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { usePanelStore } from './stores/panel-store'

const panelStore = usePanelStore()

onMounted(() => panelStore.getData())
</script>
