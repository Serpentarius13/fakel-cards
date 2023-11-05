import { defineStore } from 'pinia'
import { ref } from 'vue'
import { usePanelStore } from './panel-store'
import { useBufferStore } from './buffer-store'

export const useFilteringStore = defineStore('filtering', () => {
  const selectFilter = ref<string>('Не выбрано')

  const panelStore = usePanelStore()
  const bufferStore = useBufferStore()

  const panelData = ref(panelStore.panelData)
  const cardsBuffer = ref(bufferStore.cardsBuffer)

  function filterCards (value: boolean | string) {
    panelData.value.forEach((column) => {
      column.cards = column.cards?.filter((card) => card.project === value)
    })
  }

  function activateFilter (index: number) {
    cardsBuffer.value.forEach((arr) => { arr.length = 0 })

    if (selectFilter.value === `Проект ${index}`) {
      bufferStore.emptyColumns()
      filterCards(selectFilter.value)
    } else if (selectFilter.value === 'Без проекта') {
      bufferStore.emptyColumns()
      filterCards(false)
    } else if (selectFilter.value === 'Не выбрано') {
      bufferStore.emptyColumns()
    }
  }

  return { selectFilter, activateFilter }
})
