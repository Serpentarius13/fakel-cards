import { defineStore } from 'pinia'
import { ref, reactive } from 'vue'
import { PanelData, PanelDataColumn, PanelDataCard, Column, Project, Card, Response } from '../components/models'
import COLUMNS from '../json/columns.json'
import CARDS from '../json/cards.json'
import PROJECTS from '../json/projects.json'

export const usePanelStore = defineStore('panel', () => {
  const panelData = reactive([] as PanelData)
  const isLoading = ref<boolean>(false)
  const cardsOriginal = reactive([[], [], [], []] as PanelDataCard[][])
  const projects = reactive([] as string[])

  function getData () {
    if (!localStorage.getItem('panelData')) {
      isLoading.value = true

      setTimeout(async () => {
        return await Promise.all([COLUMNS, CARDS, PROJECTS])
          .then((res: Response) => {
            res[0].forEach((column: Column) => panelData.push(column))
            panelData.forEach((column: PanelDataColumn, index: number) => {
              column.sortedDown = false
              column.sortedUp = false
              column.cards = res[1].filter((card: Card) => card.stage === `stage-${index + 1}`)

              column.cards.forEach((card: PanelDataCard) => {
                card.projects = res[2].filter((project: Project) => project.code === card.project)
              })
            })
            localStorage.setItem('panelData', JSON.stringify(panelData))

            res[2].forEach((project: Project) => {
              projects[0] = 'Не выбрано'
              projects.push(project.name)
            })
            localStorage.setItem('projects', JSON.stringify(projects))

            isLoading.value = false
          })
      }, 2000)
    } else {
      const lSPanelData = JSON.parse(localStorage.getItem('panelData') || '{}')
      const lSProjects = JSON.parse(localStorage.getItem('projects') || '{}')

      lSPanelData.forEach((item: PanelDataColumn) => panelData.push(item))
      lSProjects.forEach((item: string) => projects.push(item))
    }
  }

  function sortDescendingTrue (item: PanelData, index: number) {
    if (cardsOriginal[index].length) {
      item[index].cards!.length = 0
      cardsOriginal[index].forEach((card) => item[index].cards?.push(card))
      cardsOriginal[index].length = 0
    }
    item[index].cards?.forEach((card) => cardsOriginal[index].push(card))
    item[index].cards?.sort((a, b) => b.score - a.score)
    item[index].sortedUp = false
    item[index].sortedDown = true
  }

  function sortDescendingFalse (item: PanelData, index: number) {
    item[index].cards!.length = 0
    cardsOriginal[index].forEach((card) => item[index].cards?.push(card))
    cardsOriginal[index].length = 0
    item[index].sortedDown = false
  }

  function sortAscendingTrue (item: PanelData, index: number) {
    if (cardsOriginal[index].length) {
      item[index].cards!.length = 0
      cardsOriginal[index].forEach((card) => item[index].cards?.push(card))
      cardsOriginal[index].length = 0
    }
    item[index].cards?.forEach((card) => cardsOriginal[index].push(card))
    item[index].cards?.sort((a, b) => a.score - b.score)
    item[index].sortedDown = false
    item[index].sortedUp = true
  }

  function sortAscendingFalse (item: PanelData, index: number) {
    item[index].cards!.length = 0
    cardsOriginal[index].forEach((card) => item[index].cards?.push(card))
    cardsOriginal[index].length = 0
    item[index].sortedUp = false
  }

  return {
    panelData,
    isLoading,
    projects,
    getData,
    sortDescendingTrue,
    sortDescendingFalse,
    sortAscendingTrue,
    sortAscendingFalse
  }
})
