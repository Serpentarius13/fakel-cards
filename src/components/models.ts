export interface Todo {
  id: number;
  content: string;
}

export interface Meta {
  totalCount: number;
}

interface Column {
  id: number;
  sort: number;
  name: string;
  code: string;
}

interface Card {
  id: number
  project: boolean | string
  score: number
  stage: string
  title: string
}

type Project = Column

interface panelDataCard extends Card {
  projects?: Project[]
}

export interface panelDataColumn extends Column {
  sortedDown?: boolean
  sortedUp?: boolean
  cards?: panelDataCard[]
}

export type panelData = panelDataColumn[]
