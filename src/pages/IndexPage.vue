<template>
  <q-page class="bg-secondary container">
    <section>
      <div class="row justify-between items-center">
        <p class="main-heading">Карточки</p>
        <div class="row q-gutter-x-sm items-center">
          <div class="text-primary caption">Проект:</div>
          <q-btn-dropdown
            class="custom-dropdown-toggle"
            text-color="info"
            no-caps
            color="warning"
            unelevated
            label="Не выбрано"
          >
          </q-btn-dropdown>
          <q-btn
            no-caps
            class="q-px-lg"
            color="accent"
            unelevated
            label="Добавить карточку"
          />
          <q-btn
            no-caps
            class="q-px-lg"
            color="accent"
            unelevated
            label="Сохранить изменения"
          />
        </div>
      </div>
    </section>
  </q-page>
</template>

<script setup lang="ts">
</script>
