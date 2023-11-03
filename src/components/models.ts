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

export type Project = Column

export type Response = [Column[], Card[], Project[]]

export interface PanelDataCard extends Card {
  projects?: Project[]
}

export interface PanelDataColumn extends Column {
  sortedDown?: boolean
  sortedUp?: boolean
  cards?: PanelDataCard[]
}

export type PanelData = PanelDataColumn[]
