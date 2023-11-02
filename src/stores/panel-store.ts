import { defineStore } from 'pinia'
import { reactive } from 'vue'
import { apiData, panelData } from '../components/models'
import COLUMNS from '../json/columns.json'
import CARDS from '../json/cards.json'
import PROJECTS from '../json/projects.json'

export const usePanelStore = defineStore('panel', () => {
  const apiData = reactive({} as apiData)

  const panelData = reactive([] as panelData)

  async function getData () {
    const response = await Promise.all([COLUMNS, CARDS, PROJECTS])

    apiData.columns = response[0]
    apiData.cards = response[1]
    apiData.projects = response[2]

    apiData.columns.forEach((item) => panelData.push(item))

    panelData.forEach((column, index) => {
      column.cards = apiData.cards.filter((item) => item.stage === `stage-${index + 1}`)
      column.cards.forEach((card) => {
        card.projects = apiData.projects.filter((item) => item.code === card.project)
      })
    })

    console.log(apiData)
    console.log(panelData)
  }

  return { apiData, panelData, getData }
})
