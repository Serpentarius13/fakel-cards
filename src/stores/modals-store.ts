import { defineStore } from 'pinia'
import { ref, reactive } from 'vue'
import { PanelDataColumn, EditCard, Column, Card } from '../components/models'
import { usePanelStore } from './panel-store'

export const useModalsStore = defineStore('modals', () => {
  const panelStore = usePanelStore()

  const selectStage = ref<string>('Стадия 1')
  const modalAddCard = reactive({ isOpen: false, stage: 0 })
  const modalEditCard = reactive<EditCard>({
    id: 0,
    isOpen: false,
    stage: 0,
    title: '',
    score: 0,
    project: false
  })
  const cardHeading = ref<string>('')
  const score = ref<number>(0)
  const selectModal = ref<boolean | string>('Без проекта')

  const panelData = reactive(panelStore.panelData)

  function triggerModalAdd (column: Column) {
    modalAddCard.isOpen = true
    modalAddCard.stage = column.id
  }

  function triggerModalEdit (column: PanelDataColumn, card: Card) {
    column.sortedDown = false
    column.sortedUp = false

    modalEditCard.isOpen = true
    modalEditCard.id = card.id
    modalEditCard.stage = column.id
    modalEditCard.title = card.title
    modalEditCard.score = card.score
    modalEditCard.project = card.project

    cardHeading.value = modalEditCard.title
    selectModal.value = card.project ? card.project : 'Без проекта'
    score.value = card.score
  }

  function closeModal () {
    cardHeading.value = ''
    score.value = 0
    modalEditCard.isOpen = false
    modalAddCard.isOpen = false
  }

  return {
    panelData,
    selectStage,
    selectModal,
    cardHeading,
    score,
    modalAddCard,
    modalEditCard,
    triggerModalAdd,
    triggerModalEdit,
    closeModal
  }
})
