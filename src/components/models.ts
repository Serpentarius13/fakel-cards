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
  id: number;
  title: string;
  stage: string;
  project: boolean;
  score: number;
}

type Project = Column

export interface panelDataFull {
  columns: Column[] | []
  cards: Card[] | []
  projects: Project[] | []
}

export type panelData = {} | panelDataFull
