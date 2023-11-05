import { defineStore } from 'pinia'
import { reactive } from 'vue'
import { PanelData, PanelDataColumn, Card } from '../components/models'

export const useBufferStore = defineStore('buffer', () => {
  const cardsBuffer = reactive([[], [], [], []] as Card[][])
  const stages = reactive([] as string[])
  const projectsFilter = reactive([] as string[])
  const projectsModal = reactive([] as string[])

  function emptyColumns (arr: PanelData) {
    arr.length = 0
    const bufferPanelData = JSON.parse(localStorage.getItem('bufferPanelData') || '{}')
    bufferPanelData.forEach((column: PanelDataColumn) => arr.push(column))
  }

  function emptyCardsBuffer (item: PanelData, index: number) {
    item[index].cards!.length = 0
    cardsBuffer[index].forEach((card) => item[index].cards?.push(card))
    cardsBuffer[index].length = 0
  }

  return {
    cardsBuffer,
    stages,
    projectsFilter,
    projectsModal,
    emptyColumns,
    emptyCardsBuffer
  }
})
