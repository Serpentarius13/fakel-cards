import { defineStore } from 'pinia'
import { ref, reactive } from 'vue'
import { PanelData, PanelDataColumn, Column, Card, Project, Response } from './models'
import COLUMNS from '../json/columns.json'
import CARDS from '../json/cards.json'
import PROJECTS from '../json/projects.json'
import { useBufferStore } from './buffer-store'

export const usePanelStore = defineStore('panel', () => {
  const bufferStore = useBufferStore()

  const panelData = reactive([] as PanelData)
  const isLoading = ref<boolean>(false)

  const stages = reactive(bufferStore.stages)
  const projectsFilter = reactive(bufferStore.projectsFilter)
  const projectsModal = reactive(bufferStore.projectsModal)

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
      const lSPanelData = JSON.parse(localStorage.getItem('panelData') || '{}')
      const lSProjectsFilter = JSON.parse(localStorage.getItem('projectsFilter') || '{}')
      const lSProjectsModal = JSON.parse(localStorage.getItem('projectsModal') || '{}')
      const lSStages = JSON.parse(localStorage.getItem('stages') || '{}')

      lSPanelData.forEach((column: PanelDataColumn) => panelData.push(column))
      lSProjectsFilter.forEach((option: string) => projectsFilter.push(option))
      lSProjectsModal.forEach((option: string) => projectsModal.push(option))
      lSStages.forEach((option: string) => stages.push(option))
      localStorage.setItem('bufferPanelData', JSON.stringify(panelData))
    }
  }

  return { panelData, isLoading, getData }
})
