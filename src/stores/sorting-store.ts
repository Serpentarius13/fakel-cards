import { defineStore } from 'pinia'
import { reactive } from 'vue'
import { PanelData, Card } from '../components/models'
import { useBufferStore } from './buffer-store'

export const useSortingStore = defineStore('sorting', () => {
  const bufferStore = useBufferStore()

  const cardsBuffer = reactive(bufferStore.cardsBuffer)

  const descendOrder = (a: Card, b: Card): number => b.score - a.score
  const ascendOrder = (a: Card, b: Card): number => a.score - b.score

  function sortTrue (arr: PanelData, index: number, prop: string, callback: (a: Card, b: Card) => number) {
    if (cardsBuffer[index].length) {
      bufferStore.emptyCardsBuffer(arr, index)
    }

    arr[index].cards?.forEach((card) => cardsBuffer[index].push(card))
    arr[index].cards?.sort((a, b) => callback(a, b))

    if (prop === 'sortedDown') {
      arr[index].sortedUp = false
      arr[index].sortedDown = true
    } else if (prop === 'sortedUp') {
      arr[index].sortedDown = false
      arr[index].sortedUp = true
    }
  }

  function sortFalse (arr: PanelData, index: number, prop: string) {
    bufferStore.emptyCardsBuffer(arr, index)
    if (prop === 'sortedDown') {
      arr[index].sortedDown = false
    } else if (prop === 'sortedUp') {
      arr[index].sortedUp = false
    }
  }

  return {
    descendOrder,
    ascendOrder,
    sortTrue,
    sortFalse
  }
})
