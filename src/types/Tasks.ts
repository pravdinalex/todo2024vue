
export type Timestamp = number

export type Id = string

export type TaskSortField = 'title' | 'completed'

export interface INewTask {
  title: string
  description: string
}

export interface ITask extends INewTask {
  id: Id
  created: Timestamp
  modified: Timestamp
  completed: Timestamp | null
}
