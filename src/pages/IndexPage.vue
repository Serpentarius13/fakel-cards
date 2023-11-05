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
    <section>
      <div class="row q-gutter-md" v-if="!panelStore.isLoading">
        <q-card v-for="(column, index) in panelStore.panelData" :key="column.id" flat class="bg-warning card">
          <q-card-section>
            <div class="row justify-between items-center q-mb-md">
              <div class="card-heading">
                <span class="text-primary q-mr-xs">&bull;</span>
                <span>{{ column.name }}</span>
              </div>
              <div v-if="column.cards?.length" class="row q-gutter-x-xs">
                <img
                  v-if="!column.sortedDown"
                  @click="sortingStore.sortTrue(panelStore.panelData, index, 'sortedDown', sortingStore.descendOrder)"
                  class="cursor-pointer"
                  src="../assets/arrow_down_gray.svg"
                  alt="arrow down"
                />
                <img
                  v-else
                  @click="sortingStore.sortFalse(panelStore.panelData, index, 'sortedDown')"
                  class="cursor-pointer"
                  src ="../assets/arrow_down_blue.svg"
                  alt="arrow down"
                />
                <img
                  v-if="!column.sortedUp"
                  @click="sortingStore.sortTrue(panelStore.panelData, index, 'sortedUp', sortingStore.ascendOrder)"
                  class="cursor-pointer"
                  src="../assets/arrow_up_gray.svg"
                  alt="arrow up"
                />
                <img
                  v-else
                  @click="sortingStore.sortFalse(panelStore.panelData, index, 'sortedUp')"
                  class="cursor-pointer"
                  src="../assets/arrow_up_blue.svg"
                  alt="arrow up"
                />
              </div>
            </div>
            <draggable
              handle=".handle"
              group="cards"
              itemKey="id"
              :list="column.cards"
              @change="bufferStore.rewriteBuffer(panelStore.panelData)"
            >
              <template #item="{ element }">
                <div class="bg-white card-section column justify-between q-mt-md">
                  <div class="q-qutter-y-xs">
                    <div class="row justify-between">
                      <div class="row q-gutter-x-sm">
                        <div class="card-heading">
                          <span>{{ element.title }}</span>
                        </div>
                        <img
                          @click="modalsStore.triggerModalEdit(column, element)"
                          class="cursor-pointer"
                          src ="../assets/edit.svg"
                          alt="edit"
                        />
                        <img
                          @click="crudStore.deleteCard(index, element)"
                          class="cursor-pointer"
                          src ="../assets/delete.svg"
                          alt="delete"
                        />
                      </div>
                      <img
                        v-if="filteringStore.selectFilter === 'Не выбрано' && panelStore.panelData.every((column) => !column.sortedDown && !column.sortedUp)"
                        class="cursor-pointer handle"
                        src ="../assets/drag.svg"
                        alt="drag"
                      />
                    </div>
                    <div class="text-primary">
                      <span class="caption">Балл: </span>
                      <span class="text-dark caption bold-caption">{{ element.score }}</span>
                    </div>
                  </div>
                  <q-card v-if="element.project" flat class="bg-secondary flex flex-center project">
                    <span class="text-info">{{ element.project }}</span>
                  </q-card>
                </div>
              </template>
            </draggable>
            <div v-if="!column.cards?.length" class="bg-warning card-section empty-section flex flex-center">
              <div class="text-primary">
                <span>Список пуст</span>
              </div>
            </div>
          </q-card-section>
          <q-card-actions class="q-pt-none q-pb-md" align="center">
            <q-btn
              @click="modalsStore.triggerModalAdd(column)"
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
    <q-dialog v-model="modalsStore.modalEditCard.isOpen">
      <q-card flat class="modal-card">
        <div class="row justify-between">
          <div class="modal-card-heading">
            <p>Редактирование</p>
            <div class="text-primary">
              <span class="caption">Заголовок: </span>
              <span class="text-dark caption bold-caption">{{ modalsStore.modalEditCard.title }}</span>
            </div>
            <div class="text-primary">
              <span class="caption">Проект: </span>
              <span class="text-dark caption bold-caption">{{ modalsStore.modalEditCard.project ? modalsStore.modalEditCard.project : 'Без проекта' }}</span>
            </div>
            <div class="text-primary">
              <span class="caption">Балл: </span>
              <span class="text-dark caption bold-caption">{{ modalsStore.modalEditCard.score }}</span>
            </div>
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
            class="score"
            dense
            outlined
            bg-color="positive"
            v-model="modalsStore.score"
          />
        </div>
        <q-card-actions align="center">
          <q-btn
            @click="crudStore.editCard(modalsStore.cardHeading, modalsStore.selectModal, modalsStore.score)"
            style="padding: 0 1rem"
            no-caps
            label="Применить"
            color="accent"
            unelevated
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup lang="ts">
import draggable from 'vuedraggable'

import { watch } from 'vue'
import { PanelData } from '../components/models'
import { usePanelStore } from '../stores/panel-store'
import { useFilteringStore } from '../stores/filtering-store'
import { useBufferStore } from '../stores/buffer-store'
import { useSortingStore } from '../stores/sorting-store'
import { useModalsStore } from '../stores/modals-store'
import { useCrudStore } from '../stores/crud-store'

const panelStore = usePanelStore()
const filteringStore = useFilteringStore()
const bufferStore = useBufferStore()
const sortingStore = useSortingStore()
const modalsStore = useModalsStore()
const crudStore = useCrudStore()

function saveCurrentPanelData (arr: PanelData) {
  panelStore.isLoading = true

  setTimeout(() => {
    localStorage.setItem('panelData', JSON.stringify(arr))
    bufferStore.rewriteBuffer(arr)

    panelStore.isLoading = false
  }, 2000)
}

watch(() => filteringStore.selectFilter, () => {
  bufferStore.projectsFilter
    .forEach((option, index) => filteringStore.activateFilter(++index))
})

watch(() => modalsStore.modalAddCard.isOpen || modalsStore.modalEditCard.isOpen, () => {
  filteringStore.selectFilter = 'Не выбрано'
})
</script>
