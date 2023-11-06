<template>
  <section class="q-mr-md">
    <div class="row justify-between items-center q-mb-md">
      <p class="main-heading">Карточки</p>
      <div class="row q-gutter-sm items-center">
        <div class="text-primary caption">
          <span>Проект:</span>
        </div>
        <q-select
          :loading="panelStore.isLoading"
          :disable="panelStore.isLoading"
          dense
          outlined
          bg-color="warning"
          v-model="filteringStore.selectFilter"
          :options="bufferStore.projectsFilter"
        >
          <template v-slot:loading>
            <q-spinner
              color="info"
              size="0.8em"
            />
          </template>
        </q-select>
        <q-btn
          to="/add"
          :loading="panelStore.isLoading"
          :disable="panelStore.isLoading"
          @click="filteringStore.selectFilter = 'Не выбрано'"
          no-caps
          class="q-px-lg"
          color="accent"
          unelevated
          label="Добавить карточку"
        >
          <template v-slot:loading>
            <q-spinner
              color="white"
              size="1em"
            />
          </template>
        </q-btn>
        <q-btn
          @click="saveCurrentPanelData(panelStore.panelData)"
          :loading="panelStore.isLoading"
          :disable="panelStore.isLoading || filteringStore.selectFilter !== 'Не выбрано'"
          no-caps
          class="q-px-lg"
          color="accent"
          unelevated
          label="Сохранить изменения"
        >
          <template v-slot:loading>
            <q-spinner
              color="white"
              size="1em"
            />
          </template>
        </q-btn>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { PanelData } from '../stores/models'
import { usePanelStore } from '../stores/panel-store'
import { useFilteringStore } from '../stores/filtering-store'
import { useBufferStore } from '../stores/buffer-store'

const panelStore = usePanelStore()
const filteringStore = useFilteringStore()
const bufferStore = useBufferStore()

function saveCurrentPanelData (arr: PanelData) {
  panelStore.isLoading = true

  setTimeout(() => {
    localStorage.setItem('panelData', JSON.stringify(arr))
    bufferStore.rewriteBuffer(arr)

    panelStore.isLoading = false
  }, 2000)
}
</script>
