import { defineStore } from 'pinia'
import { ref, reactive } from 'vue'
import { PanelDataColumn, EditCard, Column, Card } from '../components/models'
import { useFilteringStore } from './filtering-store'
import { useBufferStore } from './buffer-store'
import { usePanelStore } from './panel-store'

export const useModalsStore = defineStore('modals', () => {
  const panelStore = usePanelStore()
  const filteringStore = useFilteringStore()
  const bufferStore = useBufferStore()

  const panelData = reactive(panelStore.panelData)
  const selectFilter = ref(filteringStore.selectFilter)

  const projectsFilter = reactive([] as string[])
  const projectsModal = reactive([] as string[])
  const stages = reactive([] as string[])
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

  function triggerModalAdd (column: Column) {
    selectFilter.value = 'Не выбрано'

    modalAddCard.isOpen = true
    modalAddCard.stage = column.id
  }

  function triggerModalEdit (column: PanelDataColumn, card: Card, index: number) {
    selectFilter.value = 'Не выбрано'

    bufferStore.emptyCardsBuffer(panelData, index)

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
    selectModal.value = 'Без проекта'
    score.value = 0

    modalEditCard.isOpen = false
    modalAddCard.isOpen = false
  }

  return {
    projectsFilter,
    projectsModal,
    stages,
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
