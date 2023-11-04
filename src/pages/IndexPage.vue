<template>
  <q-page class="bg-secondary container">
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
            v-model="panelStore.selectFilter"
            :options="panelStore.projectsFilter"
          >
            <template v-slot:loading>
              <q-spinner
                color="info"
                size="0.8em"
              />
            </template>
          </q-select>
          <q-btn
            :loading="panelStore.isLoading"
            :disable="panelStore.isLoading"
            to="/add"
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
            :loading="panelStore.isLoading"
            :disable="panelStore.isLoading"
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
    <section>
      <div class="row q-gutter-md" v-if="!panelStore.isLoading">
        <q-card v-for="(column, index) in panelStore.panelData" :key="column.id" flat class="bg-warning card">
          <q-card-section>
            <div class="row justify-between items-center q-mb-md">
              <div class="card-heading">
                <span class="text-primary q-mr-xs">&bull;</span>
                <span>{{ column.name }}</span>
              </div>
              <div class="row q-gutter-x-xs">
                <img
                  v-if="!column.sortedDown"
                  @click="panelStore.sortTrue(panelStore.panelData, index, 'sortedDown', panelStore.descendOrder)"
                  class="cursor-pointer"
                  src="../assets/arrow_down_gray.svg"
                  alt="arrow down"
                />
                <img
                  v-else
                  @click="panelStore.sortFalse(panelStore.panelData, index, 'sortedDown')"
                  class="cursor-pointer"
                  src ="../assets/arrow_down_blue.svg"
                  alt="arrow down"
                />
                <img
                  v-if="!column.sortedUp"
                  @click="panelStore.sortTrue(panelStore.panelData, index, 'sortedUp', panelStore.ascendOrder)"
                  class="cursor-pointer"
                  src="../assets/arrow_up_gray.svg"
                  alt="arrow up"
                />
                <img
                  v-else
                  @click="panelStore.sortFalse(panelStore.panelData, index, 'sortedUp')"
                  class="cursor-pointer"
                  src="../assets/arrow_up_blue.svg"
                  alt="arrow up"
                />
              </div>
            </div>
            <div v-if="column.cards?.length">
              <div v-for="card in column.cards" :key="card.id">
                <div class="bg-white card-section column justify-between q-mt-md">
                  <div class="q-qutter-y-xs">
                    <div class="row justify-between">
                      <div class="row q-gutter-x-sm">
                        <div class="card-heading">
                          <span>{{ card.title }}</span>
                        </div>
                        <img
                          class="cursor-pointer"
                          src ="../assets/edit.svg"
                          alt="edit"
                        />
                        <img
                          class="cursor-pointer"
                          src ="../assets/delete.svg"
                          alt="delete"
                        />
                      </div>
                      <img
                          class="cursor-pointer"
                          src ="../assets/drag.svg"
                          alt="drag"
                        />
                    </div>
                    <div class="text-primary">
                      <span class="caption">Балл: </span>
                      <span class="text-dark caption bold-caption">{{ card.score }}</span>
                    </div>
                  </div>
                  <q-card v-if="card.project" flat class="bg-secondary flex flex-center project">
                    <span class="text-info">{{ card.project }}</span>
                  </q-card>
                </div>
              </div>
            </div>
            <div v-else>
              <div class="bg-warning card-section empty-section flex flex-center">
                <div class="text-primary">
                  <span>Список пуст</span>
                </div>
              </div>
            </div>
          </q-card-section>
          <q-card-actions class="q-pt-none q-pb-md" align="center">
            <q-btn
              @click="panelStore.triggerModal(column.id)"
              flat
              no-caps
              label="Добавить"
              color="warning"
              text-color="primary"
            />
          </q-card-actions>
        </q-card>
      </div>
      <div v-else class="row justify-center" style="margin-top: 15rem">
        <q-spinner
          color="accent"
          size="3em"
        />
      </div>
    </section>
    <q-dialog v-model="panelStore.modalAddCard.isOpen">
      <q-card flat class="modal-card">
        <div class="row justify-between">
          <div class="modal-card-heading">
            <p>Добавление</p>
            <div class="text-primary caption">Студия {{ panelStore.modalAddCard.stage }}</div>
          </div>
          <div class="self-start q-mt-xs">
            <img
              class="cursor-pointer"
              src ="../assets/close.svg"
              alt="close"
              @click="panelStore.modalAddCard.isOpen = false"
            />
          </div>
        </div>
        <div class="q-mt-md">
          <div class="text-primary caption">Заголовок *:</div>
          <q-input
            dense
            outlined
            bg-color="positive"
            v-model="panelStore.cardHeading"
          />
        </div>
        <div class="q-mt-md">
          <div class="text-primary caption">Проект:</div>
          <q-select
            dense
            outlined
            bg-color="positive"
            v-model="panelStore.selectModal"
            :options="panelStore.projectsModal"
          />
        </div>
        <div class="q-mt-md">
          <div class="text-primary caption">Балл *:</div>
          <q-input
            class="score"
            dense
            outlined
            bg-color="positive"
            v-model="panelStore.score"
          />
        </div>
        <q-card-actions align="center">
          <q-btn
            @click="panelStore.addCard(panelStore.modalAddCard.stage)"
            style="padding: 0 1rem"
            no-caps
            label="Добавить"
            color="accent"
            unelevated
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup lang="ts">
import { watch } from 'vue'
import { usePanelStore } from '../stores/panel-store'

const panelStore = usePanelStore()

watch(() => panelStore.selectFilter, () => {
  panelStore.projectsFilter
    .filter((option) => option !== 'Не выбрано')
    .forEach((option, index) => panelStore.activateFilter(++index))
})
</script>
