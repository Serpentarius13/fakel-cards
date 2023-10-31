<template>
  <q-page class="bg-secondary container">
    <section class="q-mr-md">
      <div class="row justify-between items-center q-mb-md">
        <p class="main-heading">Карточки</p>
        <div class="row q-gutter-sm items-center">
          <div class="text-primary caption">
            <span>Проект:</span>
          </div>
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
    <section class="row justify-start q-gutter-md">
      <q-card flat class="bg-warning card">
        <q-card-section>
          <div class="row justify-between items-center q-mb-md">
            <div class="card-heading">
              <span class="text-primary q-mr-xs">&bull;</span>
              <span>Стадия 1</span>
            </div>
            <div class="row q-gutter-x-xs">
              <img
                class="cursor-pointer"
                src ="../assets/arrow_down_gray.svg"
                alt="arrow down"
              />
              <img
                class="cursor-pointer"
                src ="../assets/arrow_up_gray.svg"
                alt="arrow up"
              />
            </div>
          </div>
          <div class="bg-white card-section column justify-between">
            <div class="q-qutter-y-xs">
              <div class="row justify-between">
                <div class="row q-gutter-x-sm">
                  <div class="card-heading">
                    <span>Карточка 1</span>
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
                <span class="text-dark caption bold-caption">3.2</span>
              </div>
            </div>
            <q-card flat bordered class="bg-warning flex flex-center project">
              <span class="text-info">Проект 1</span>
            </q-card>
          </div>
        </q-card-section>
      </q-card>
      <q-card flat class="bg-warning card">
        <q-card-section>
          <div class="row justify-between items-center q-mb-md">
            <div class="card-heading">
              <span class="text-primary q-mr-xs">&bull;</span>
              <span>Стадия 1</span>
            </div>
            <div class="row q-gutter-x-xs">
              <img
                class="cursor-pointer"
                src ="../assets/arrow_down_gray.svg"
                alt="arrow down"
              />
              <img
                class="cursor-pointer"
                src ="../assets/arrow_up_gray.svg"
                alt="arrow up"
              />
            </div>
          </div>
          <div class="bg-white card-section column justify-between">
            <div class="q-qutter-y-xs">
              <div class="row justify-between">
                <div class="row q-gutter-x-sm">
                  <div class="card-heading">
                    <span>Карточка 1</span>
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
                <span class="text-dark caption bold-caption">3.2</span>
              </div>
            </div>
            <q-card flat bordered class="bg-warning flex flex-center project">
              <span class="text-info">Проект 1</span>
            </q-card>
          </div>
        </q-card-section>
      </q-card>
    </section>
  </q-page>
</template>
