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
  const lSStages = reactive(JSON.parse(localStorage.getItem('stages') || '{}'))
  const panelData = reactive([] as PanelData)
  const isLoading = ref<boolean>(false)
  const cardsBuffer = reactive([[], [], [], []] as Card[][])
  const projectsFilter = reactive([] as string[])
  const projectsModal = reactive([] as string[])
  const stages = reactive([] as string[])
  const selectFilter = ref<string>('Не выбрано')
  const selectStage = ref<string>('Стадия 1')
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
            res[0].forEach((column: Column) => {
              panelData.push(column)
              stages.push(column.name)
            })
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

            res[2].forEach((project: Project) => {
              projectsFilter[0] = 'Не выбрано'
              projectsFilter[1] = 'Без проекта'
              projectsFilter.push(project.name)

              projectsModal[0] = 'Без проекта'
              projectsModal.push(project.name)
            })

            localStorage.setItem('stages', JSON.stringify(stages))
            localStorage.setItem('projectsFilter', JSON.stringify(projectsFilter))
            localStorage.setItem('projectsModal', JSON.stringify(projectsModal))
            localStorage.setItem('panelData', JSON.stringify(panelData))
            localStorage.setItem('bufferPanelData', JSON.stringify(panelData))

            isLoading.value = false
          })
      }, 2000)
    } else {
      lSPanelData.forEach((column: PanelDataColumn) => panelData.push(column))
      lSProjectsFilter.forEach((option: string) => projectsFilter.push(option))
      lSProjectsModal.forEach((option: string) => projectsModal.push(option))
      lSStages.forEach((option: string) => stages.push(option))

      localStorage.setItem('bufferPanelData', JSON.stringify(panelData))
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
    selectFilter.value = 'Не выбрано'

    modalAddCard.isOpen = true
    modalAddCard.stage = stage
  }

  function addCard (index: number) {
    const cardIds = panelData.map((column: PanelDataColumn) => {
      return column.cards?.map((card: Card) => card.id)
    })
    const arrOfIds = cardIds.reduce((prev, next) => prev!.concat(next!))
    const newId: number = Math.max(...arrOfIds!) + 1

    panelData[index - 1].cards?.push({
      id: newId,
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

  function deleteCard (index: number, obj: Card) {
    panelData[index].cards = panelData[index].cards?.filter((card) => card.id !== obj.id)

    cardsBuffer[index] = cardsBuffer[index].filter((card) => card.id !== obj.id)

    const bufferPanelData = JSON.parse(localStorage.getItem('bufferPanelData') || '{}')
    bufferPanelData[index].cards = bufferPanelData[index].cards?.filter((card: Card) => card.id !== obj.id)
    localStorage.setItem('bufferPanelData', JSON.stringify(bufferPanelData))
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
    selectStage,
    stages,
    getData,
    descendOrder,
    ascendOrder,
    sortTrue,
    sortFalse,
    activateFilter,
    triggerModal,
    addCard,
    deleteCard
  }
})
