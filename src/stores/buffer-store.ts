import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'
import { PanelData, PanelDataColumn, Card } from '../components/models'
import { usePanelStore } from './panel-store'

export const useBufferStore = defineStore('buffer', () => {
  const panelStore = usePanelStore()

  const cardsBuffer = reactive([[], [], [], []] as Card[][])
  const panelData = ref(panelStore.panelData)

  function emptyColumns () {
    panelData.value.length = 0
    const bufferPanelData = JSON.parse(localStorage.getItem('bufferPanelData') || '{}')
    bufferPanelData.forEach((column: PanelDataColumn) => panelData.value.push(column))
  }

  function emptyCardsBuffer (item: PanelData, index: number) {
    item[index].cards!.length = 0
    cardsBuffer[index].forEach((card) => item[index].cards?.push(card))
    cardsBuffer[index].length = 0
  }

  return { cardsBuffer, emptyColumns, emptyCardsBuffer }
})
