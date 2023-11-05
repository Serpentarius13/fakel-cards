<template>
  <q-page class="bg-secondary container">
    <section class="column items-center">
      <p class="main-heading">Добавление карточки</p>
      <q-card flat class="modal-card">
        <div class="modal-card-heading">
          <span>Основые данные</span>
          <div class="text-primary caption overflow-helper">Чтобы добавить карточку, нужно заполнить данные</div>
        </div>
        <div class="q-mt-md">
          <div class="text-primary caption">Заголовок *:</div>
          <q-input
            :loading="panelStore.isLoading"
            :disable="panelStore.isLoading"
            dense
            outlined
            bg-color="positive"
            v-model="modalsStore.cardHeading"
          />
        </div>
        <div class="q-mt-md">
          <div class="text-primary caption">Проект:</div>
          <q-select
            :loading="panelStore.isLoading"
            :disable="panelStore.isLoading"
            dense
            outlined
            bg-color="positive"
            v-model="modalsStore.selectModal"
            :options="bufferStore.projectsModal"
          />
        </div>
        <div class="q-mt-md">
          <div class="text-primary caption">Стадия *:</div>
          <q-select
            :loading="panelStore.isLoading"
            :disable="panelStore.isLoading"
            dense
            outlined
            bg-color="positive"
            v-model="modalsStore.selectStage"
            :options="bufferStore.stages"
          />
        </div>
        <div class="q-mt-md">
          <div class="text-primary caption">Балл *:</div>
          <q-input
            :loading="panelStore.isLoading"
            :disable="panelStore.isLoading"
            class="score"
            dense
            outlined
            bg-color="positive"
            v-model="modalsStore.score"
          />
        </div>
        <q-card-actions align="center" class="q-mt-xl">
          <q-btn
            @click="addCardWithStage"
            :loading="panelStore.isLoading"
            :disable="panelStore.isLoading"
            style="padding: 0 1rem"
            no-caps
            label="Добавить"
            color="accent"
            unelevated
          />
          <q-btn
            to="/"
            style="padding: 0 1rem"
            flat
            no-caps
            label="Назад"
            color="warning"
            text-color="primary"
          />
        </q-card-actions>
      </q-card>
    </section>
  </q-page>
</template>

<script setup lang="ts">
import { usePanelStore } from '../stores/panel-store'
import { useCrudStore } from '../stores/crud-store'
import { useRouter } from 'vue-router'
import { useBufferStore } from 'src/stores/buffer-store'
import { useModalsStore } from 'src/stores/modals-store'

const panelStore = usePanelStore()
const crudStore = useCrudStore()
const bufferStore = useBufferStore()
const modalsStore = useModalsStore()

const router = useRouter()

function addCardWithStage () {
  crudStore.addCard(bufferStore.stages.indexOf(modalsStore.selectStage) + 1)
  modalsStore.selectStage = 'Стадия 1'
  router.push({ path: '/' })
}
</script>
