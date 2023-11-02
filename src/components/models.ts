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

export interface panelData {
  columns: Column[]
  cards: Card[]
  projects: Project[]
}
