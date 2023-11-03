import { defineStore } from 'pinia'
import { ref, reactive } from 'vue'
import { panelData, panelDataColumn, panelDataCard } from '../components/models'
import COLUMNS from '../json/columns.json'
import CARDS from '../json/cards.json'
import PROJECTS from '../json/projects.json'

export const usePanelStore = defineStore('panel', () => {
  const panelData = reactive([] as panelData)
  const isLoading = ref<boolean>(false)

  const cardsOriginal = reactive([] as panelDataCard[])

  function getData () {
    if (!localStorage.getItem('panelData')) {
      isLoading.value = true

      setTimeout(async () => {
        return await Promise.all([COLUMNS, CARDS, PROJECTS])
          .then((res) => {
            res[0].forEach((item) => panelData.push(item))

            panelData.forEach((column, index) => {
              column.sortedDown = false
              column.sortedUp = false
              column.cards = res[1].filter((item) => item.stage === `stage-${index + 1}`)

              column.cards.forEach((card) => {
                card.projects = res[2].filter((item) => item.code === card.project)
              })
            })

            localStorage.setItem('panelData', JSON.stringify(panelData))

            isLoading.value = false
          })
      }, 2000)
    } else {
      JSON.parse(localStorage.getItem('panelData') || '{}').forEach((item: panelDataColumn) => panelData.push(item))
    }
  }

  function sortDescendingTrue (item: panelDataColumn) {
    if (cardsOriginal.length) {
      item.cards!.length = 0
      cardsOriginal.forEach((card) => item.cards?.push(card))
      cardsOriginal.length = 0
    }
    item.cards?.forEach((card) => cardsOriginal.push(card))
    item.cards?.sort((a, b) => b.score - a.score)
    item.sortedUp = false
    item.sortedDown = true
    console.log(cardsOriginal)
  }

  function sortDescendingFalse (item: panelDataColumn) {
    item.cards!.length = 0
    cardsOriginal.forEach((card) => item.cards?.push(card))
    cardsOriginal.length = 0
    item.sortedDown = false
    console.log(cardsOriginal)
  }

  function sortAscendingTrue (item: panelDataColumn) {
    if (cardsOriginal.length) {
      item.cards!.length = 0
      cardsOriginal.forEach((card) => item.cards?.push(card))
      cardsOriginal.length = 0
    }
    item.cards?.forEach((card) => cardsOriginal.push(card))
    item.cards?.sort((a, b) => a.score - b.score)
    item.sortedDown = false
    item.sortedUp = true
    console.log(cardsOriginal)
  }

  function sortAscendingFalse (item: panelDataColumn) {
    item.cards!.length = 0
    cardsOriginal.forEach((card) => item.cards?.push(card))
    cardsOriginal.length = 0
    item.sortedUp = false
    console.log(cardsOriginal)
  }

  return {
    panelData,
    isLoading,
    getData,
    sortDescendingTrue,
    sortDescendingFalse,
    sortAscendingTrue,
    sortAscendingFalse
  }
})
