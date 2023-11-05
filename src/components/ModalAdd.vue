<template>
  <q-dialog v-model="modalsStore.modalAddCard.isOpen">
    <q-card flat class="modal-card">
      <div class="row justify-between">
        <div class="modal-card-heading">
          <p>Добавление</p>
          <div class="text-primary caption">Студия {{ modalsStore.modalAddCard.stage }}</div>
        </div>
        <div class="self-start q-mt-xs">
          <img
            @click="modalsStore.closeModal"
            class="cursor-pointer"
            src ="../assets/close.svg"
            alt="close"
          />
        </div>
      </div>
      <div class="q-mt-md">
        <div class="text-primary caption">Заголовок *:</div>
        <q-input
          :rules="[ val => val.length <= 20 || 'Превышен лимит в 20 символов']"
          bottom-slots
          counter
          dense
          outlined
          bg-color="positive"
          v-model="modalsStore.cardHeading"
        />
      </div>
      <div class="q-mt-md">
        <div class="text-primary caption">Проект:</div>
        <q-select
          dense
          outlined
          bg-color="positive"
          v-model="modalsStore.selectModal"
          :options="bufferStore.projectsModal"
        />
      </div>
      <div class="q-mt-md">
        <div class="text-primary caption">Балл *:</div>
        <q-input
          :rules="[ val => +val <= 10 || 'Введите значение ниже', val => +val > 0 || 'Введите значение выше']"
          class="score"
          dense
          outlined
          bg-color="positive"
          v-model="modalsStore.score"
        />
      </div>
      <q-card-actions align="center">
        <q-btn
          @click="crudStore.addCard(modalsStore.modalAddCard.stage, modalsStore.cardHeading, modalsStore.selectModal, modalsStore.score)"
          style="padding: 0 1rem"
          no-caps
          label="Добавить"
          color="accent"
          unelevated
        />
      </q-card-actions>
    </q-card>
</q-dialog>
</template>

<script setup lang="ts">
import { useBufferStore } from '../stores/buffer-store'
import { useModalsStore } from '../stores/modals-store'
import { useCrudStore } from '../stores/crud-store'

const bufferStore = useBufferStore()
const modalsStore = useModalsStore()
const crudStore = useCrudStore()
</script>
