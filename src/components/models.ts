export interface Todo {
  id: number;
  content: string;
}

export interface Meta {
  totalCount: number;
}

export interface Column {
  id: number;
  sort: number;
  name: string;
  code: string;
}

export interface Card {
  id: number
  project: boolean | string
  score: number
  stage: string
  title: string
}

export interface EditCard {
  id: number
  stage: number
  isOpen: boolean
  project: boolean | string
  score: number
  title: string
}

export type Project = Column

export type Response = [Column[], Card[], Project[]]

export interface PanelDataColumn extends Column {
  sortedDown?: boolean
  sortedUp?: boolean
  cards?: Card[]
}

export type PanelData = PanelDataColumn[]
