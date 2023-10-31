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
            dense
            outlined
            bg-color="positive"
            v-model="text"
          />
        </div>
        <div class="q-mt-md">
          <div class="text-primary caption">Проект:</div>
          <q-select
            dense
            outlined
            bg-color="positive"
            v-model="select"
            :options="options"
          />
        </div>
        <div class="q-mt-md">
          <div class="text-primary caption">Стадия *:</div>
          <q-select
            dense
            outlined
            bg-color="positive"
            v-model="select"
            :options="options"
          />
        </div>
        <div class="q-mt-md">
          <div class="text-primary caption">Балл *:</div>
          <q-input
            class="score"
            dense
            outlined
            bg-color="positive"
            v-model="text"
          />
        </div>
        <q-card-actions align="center" class="q-mt-xl">
          <q-btn
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
import { ref, reactive } from 'vue'

const modal = ref<boolean>(false)
const text = ref<string>('')
const select = ref<string>('Не выбрано')
const options = reactive<string[]>([
  'Google', 'Facebook', 'Twitter', 'Apple', 'Oracle'
])
</script>
