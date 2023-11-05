import { defineStore } from 'pinia'
import { ref, reactive } from 'vue'
import { PanelDataColumn, Card } from '../components/models'
import { useBufferStore } from './buffer-store'
import { usePanelStore } from './panel-store'
import { useModalsStore } from './modals-store'

export const useCrudStore = defineStore('crud', () => {
  const panelStore = usePanelStore()
  const bufferStore = useBufferStore()
  const modalStore = useModalsStore()

  const selectModal = ref(modalStore.selectModal)
  const score = ref(modalStore.score)
  const cardHeading = ref(modalStore.cardHeading)
  const modalEditCard = reactive(modalStore.modalEditCard)

  const panelData = reactive(panelStore.panelData)
  const cardsBuffer = reactive(bufferStore.cardsBuffer)

  function addCard (index: number, cardTitle: string, cardProject: boolean | string, cardScore: number) {
    const cardIds = panelData.map((column: PanelDataColumn) => {
      return column.cards?.map((card: Card) => card.id)
    })
    const arrOfIds = cardIds.reduce((prev, next) => prev!.concat(next!))
    const newId: number = Math.max(...arrOfIds!) + 1

    panelData[index - 1].cards?.push({
      id: newId,
      project: cardProject === 'Без проекта' ? false : cardProject,
      score: cardScore,
      stage: `stage-${index}`,
      title: cardTitle
    })

    localStorage.setItem('bufferPanelData', JSON.stringify(panelData))

    modalStore.closeModal()
  }

  function editCard (cardTitle: string, cardProject: boolean | string, cardScore: number) {
    const cardToBeEditted = panelData[modalEditCard.stage - 1].cards?.find((card) => card.id === modalEditCard.id)

    cardToBeEditted!.title = cardTitle
    cardToBeEditted!.project = cardProject === 'Без проекта' ? false : cardProject
    cardToBeEditted!.score = cardScore

    localStorage.setItem('bufferPanelData', JSON.stringify(panelData))

    modalStore.closeModal()
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
    addCard,
    editCard,
    deleteCard
  }
})
