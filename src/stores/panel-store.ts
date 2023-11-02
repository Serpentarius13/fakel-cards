import { defineStore } from 'pinia'
import { reactive } from 'vue'
import COLUMNS from '../json/columns.json'
import CARDS from '../json/cards.json'
import PROJECTS from '../json/projects.json'

import { panelData } from '../components/models'

export const usePanelStore = defineStore('panel', () => {
  let panelData: panelData = reactive({})

  async function getData () {
    return await Promise.all([COLUMNS, CARDS, PROJECTS])
      .then((res) => {
        panelData = {
          columns: res[0],
          cards: res[1],
          projects: res[2]
        }
      })
  }

  return { panelData, getData }
})
