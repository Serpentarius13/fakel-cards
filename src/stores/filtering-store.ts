import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'
import { usePanelStore } from './panel-store'
import { useBufferStore } from './buffer-store'

export const useFilteringStore = defineStore('filtering', () => {
  const selectFilter = ref<string>('Не выбрано')

  const panelStore = usePanelStore()
  const bufferStore = useBufferStore()

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
