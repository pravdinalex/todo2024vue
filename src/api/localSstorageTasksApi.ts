import { nanoid } from 'nanoid'
import { TasksStorageApi } from '@/api/tasksStorageApi'
import type { Id, INewTask, ITask } from '@/types/Tasks'
import { getTimestamp } from '@/helpers/dateUtils'

// when we'll change task definition, old ones shouldn't be taken
export const STORE_VERSION = 'v.1.0'
export const TASKS_INDEX_KEY = 'tasks-index'
export const TASK_KEY_PREFIX = 'task'

export class LocalStorageTasksApi extends TasksStorageApi {

  constructor() {
    super()

    if (!localStorage) {
      // TODO: here we need more complicated check if it's critical
      throw new Error(`Localstorage isnt available or turned on`)
    }
  }

  private getVersionedKey(key: string): string {
    return `${STORE_VERSION}/${key}`
  }

  private getData(key: string): unknown | null {
    const raw = localStorage.getItem(this.getVersionedKey(key))
    return !raw
      ? null
      : JSON.parse(raw)
  }

  private saveData(key: string, data: unknown) {
    const raw = JSON.stringify(data)
    localStorage.setItem(this.getVersionedKey(key), raw)
  }

  private deleteData(key: string) {
    localStorage.removeItem(this.getVersionedKey(key))
  }

  // --- helpers ---

  private taskKey(id: Id): string {
    return `${TASK_KEY_PREFIX}/${id}`
  }

  private getIndex(): Id[] {
    return this.getData(TASKS_INDEX_KEY) as (Id[] | null) ?? []
  }

  private saveIndex(ids: Id[]) {
    this.saveData(TASKS_INDEX_KEY, ids)
  }

  // --- public ---

  insertTask(newTask: INewTask): ITask {
    const task: ITask = {
      id: nanoid(),
      created: getTimestamp(),
      modified: getTimestamp(),
      completed: null,
      ...newTask,
    }

    this.saveData(this.taskKey(task.id), task)
    const ids = this.getIndex()
    ids.push(task.id)
    this.saveIndex(ids)

    return task
  }

  updateTask(task: ITask) {
    this.saveData(this.taskKey(task.id), task)
  }

  deleteTask(deleteId: Id) {
    const ids = this.getIndex()
    this.saveIndex(ids.filter(id => id !== deleteId))
    this.deleteData(this.taskKey(deleteId))
  }

  getAllTasks(): ITask[] {
    const ids = this.getIndex()
    const res: ITask[] = []
    ids.forEach((taskId) => {
      const task = this.getData(this.taskKey(taskId))
      if (task) {
        res.push(task as ITask)
      }
    })
    return res
  }

}
