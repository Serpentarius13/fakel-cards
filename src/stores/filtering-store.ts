import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'
import { usePanelStore } from './panel-store'
import { useBufferStore } from './buffer-store'

export const useFilteringStore = defineStore('filtering', () => {
  const panelStore = usePanelStore()
  const bufferStore = useBufferStore()

  const selectFilter = ref<string>('Не выбрано')

  const panelData = reactive(panelStore.panelData)
  const cardsBuffer = reactive(bufferStore.cardsBuffer)

  function filterCards (value: boolean | string) {
    panelData.forEach((column) => {
      column.cards = column.cards?.filter((card) => card.project === value)
    })
  }

  function activateFilter (index: number) {
    cardsBuffer.forEach((arr) => { arr.length = 0 })

    if (selectFilter.value === `Проект ${index}`) {
      bufferStore.emptyColumns(panelData)
      filterCards(selectFilter.value)
    } else if (selectFilter.value === 'Без проекта') {
      bufferStore.emptyColumns(panelData)
      filterCards(false)
    } else if (selectFilter.value === 'Не выбрано') {
      bufferStore.emptyColumns(panelData)
    }
  }

  return { panelData, selectFilter, activateFilter }
})
