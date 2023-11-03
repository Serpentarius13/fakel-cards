import { defineStore } from 'pinia'
import { ref, reactive } from 'vue'
import { PanelData, PanelDataColumn, Column, Card, Project, Response } from '../components/models'
import COLUMNS from '../json/columns.json'
import CARDS from '../json/cards.json'
import PROJECTS from '../json/projects.json'

export const usePanelStore = defineStore('panel', () => {
  const panelData = reactive([] as PanelData)
  const isLoading = ref<boolean>(false)
  const cardsOriginal = reactive([[], [], [], []] as Card[][])
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

              column.cards.forEach((card: Card) => {
                if (typeof card.project === 'string') {
                  card.project = card.project.replace('project-', 'Проект ')
                }
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

  function emptyCardsOriginal (item: PanelData, index: number) {
    item[index].cards!.length = 0
    cardsOriginal[index].forEach((card) => item[index].cards?.push(card))
    cardsOriginal[index].length = 0
  }

  const descendOrder = (a: Card, b: Card) => b.score - a.score
  const ascendOrder = (a: Card, b: Card) => a.score - b.score

  function sortTrue (arr: PanelData, index: number, prop: string, callback: (a: Card, b: Card) => number) {
    if (cardsOriginal[index].length) {
      emptyCardsOriginal(arr, index)
    }

    arr[index].cards?.forEach((card) => cardsOriginal[index].push(card))
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
    emptyCardsOriginal(arr, index)

    if (prop === 'sortedDown') {
      arr[index].sortedDown = false
    } else if (prop === 'sortedUp') {
      arr[index].sortedUp = false
    }
  }

  return {
    panelData,
    isLoading,
    projects,
    getData,
    descendOrder,
    ascendOrder,
    sortTrue,
    sortFalse
  }
})
