import { defineStore } from 'pinia'
import { reactive } from 'vue'
import COLUMNS from '../json/columns.json'
import CARDS from '../json/cards.json'
import PROJECTS from '../json/projects.json'

import { panelData } from '../components/models'

export const usePanelStore = defineStore('panel', () => {
  const panelData = reactive({} as panelData)

  async function getData () {
    const response = await Promise.all([COLUMNS, CARDS, PROJECTS])
    panelData.columns = response[0]
    panelData.cards = response[1]
    panelData.projects = response[2]
  }

  return { panelData, getData }
})
