import { defineStore } from 'pinia'
import { ref, reactive } from 'vue'
import { PanelData, PanelDataColumn, Column, Card, Project, Response } from '../components/models'
import COLUMNS from '../json/columns.json'
import CARDS from '../json/cards.json'
import PROJECTS from '../json/projects.json'

export const usePanelStore = defineStore('panel', () => {
  const lSPanelData = reactive(JSON.parse(localStorage.getItem('panelData') || '{}'))
  const lSProjectsFilter = reactive(JSON.parse(localStorage.getItem('projectsFilter') || '{}'))
  const lSProjectsModal = reactive(JSON.parse(localStorage.getItem('projectsModal') || '{}'))
  const panelData = reactive([] as PanelData)
  const isLoading = ref<boolean>(false)
  const cardsBuffer = reactive([[], [], [], []] as Card[][])
  const projectsFilter = reactive([] as string[])
  const projectsModal = reactive([] as string[])
  const selectFilter = ref<string>('Не выбрано')
  const modalAddCard = reactive({ isOpen: false, stage: 0 })
  const cardHeading = ref<string>('')
  const score = ref<number>(0)
  const selectModal = ref<string>('Без проекта')

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

            localStorage.setItem('bufferPanelData', JSON.stringify(panelData))

            res[2].forEach((project: Project) => {
              projectsFilter[0] = 'Не выбрано'
              projectsFilter[1] = 'Без проекта'
              projectsFilter.push(project.name)

              projectsModal[0] = 'Без проекта'
              projectsModal.push(project.name)
            })

            localStorage.setItem('projectsFilter', JSON.stringify(projectsFilter))
            localStorage.setItem('projectsModal', JSON.stringify(projectsModal))

            isLoading.value = false
          })
      }, 2000)
    } else {
      lSPanelData.forEach((column: PanelDataColumn) => panelData.push(column))
      lSProjectsFilter.forEach((option: string) => projectsFilter.push(option))
      lSProjectsModal.forEach((option: string) => projectsModal.push(option))
    }
  }

  function emptyColumns () {
    panelData.length = 0
    const bufferPanelData = JSON.parse(localStorage.getItem('bufferPanelData') || '{}')
    bufferPanelData.forEach((column: PanelDataColumn) => panelData.push(column))
  }

  function filterCards (value: boolean | string) {
    panelData.forEach((column) => {
      column.cards = column.cards?.filter((card) => card.project === value)
    })
  }

  function emptyCardsBuffer (item: PanelData, index: number) {
    item[index].cards!.length = 0
    cardsBuffer[index].forEach((card) => item[index].cards?.push(card))
    cardsBuffer[index].length = 0
  }

  const descendOrder = (a: Card, b: Card) => b.score - a.score
  const ascendOrder = (a: Card, b: Card) => a.score - b.score

  function triggerModal (stage: number) {
    emptyColumns()
    selectFilter.value = 'Не выбрано'

    modalAddCard.isOpen = true
    modalAddCard.stage = stage
  }

  function addCard (index: number) {
    panelData[index - 1].cards?.push({
      id: panelData[index - 1].cards!.length + 1,
      project: selectModal.value === 'Без проекта' ? false : selectModal.value,
      score: score.value,
      stage: `stage-${index}`,
      title: cardHeading.value
    })

    localStorage.setItem('bufferPanelData', JSON.stringify(panelData))

    cardHeading.value = ''
    selectModal.value = 'Без проекта'
    score.value = 0

    modalAddCard.isOpen = false
  }

  function sortTrue (arr: PanelData, index: number, prop: string, callback: (a: Card, b: Card) => number) {
    if (cardsBuffer[index].length) {
      emptyCardsBuffer(arr, index)
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
    emptyCardsBuffer(arr, index)
    if (prop === 'sortedDown') {
      arr[index].sortedDown = false
    } else if (prop === 'sortedUp') {
      arr[index].sortedUp = false
    }
  }

  function activateFilter (index: number) {
    if (selectFilter.value === `Проект ${index}`) {
      emptyColumns()
      filterCards(selectFilter.value)
    } else if (selectFilter.value === 'Без проекта') {
      emptyColumns()
      filterCards(false)
    } else if (selectFilter.value === 'Не выбрано') {
      emptyColumns()
    }
  }

  return {
    panelData,
    isLoading,
    projectsFilter,
    projectsModal,
    selectFilter,
    modalAddCard,
    cardHeading,
    score,
    selectModal,
    getData,
    descendOrder,
    ascendOrder,
    sortTrue,
    sortFalse,
    activateFilter,
    triggerModal,
    addCard
  }
})
