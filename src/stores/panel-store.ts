import { defineStore } from 'pinia'
import { ref, reactive } from 'vue'
import { panelData, panelDataColumn } from '../components/models'
import COLUMNS from '../json/columns.json'
import CARDS from '../json/cards.json'
import PROJECTS from '../json/projects.json'

export const usePanelStore = defineStore('panel', () => {
  const panelData = reactive([] as panelData)

  const isLoading = ref<boolean>(false)

  function getData () {
    if (!localStorage.getItem('panelData')) {
      isLoading.value = true

      setTimeout(async () => {
        return await Promise.all([COLUMNS, CARDS, PROJECTS])
          .then((res) => {
            res[0].forEach((item) => panelData.push(item))

            panelData.forEach((column, index) => {
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
      JSON.parse(localStorage.getItem('panelData')!).forEach((item: panelDataColumn) => panelData.push(item))
    }
  }
  return { panelData, isLoading, getData }
})
