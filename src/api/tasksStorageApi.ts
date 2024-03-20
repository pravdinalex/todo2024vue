import type { Id, INewTask, ITask } from '@/types/Tasks'

export abstract class TasksStorageApi {

  public abstract insertTask(newTask: INewTask): ITask

  public abstract updateTask(task: ITask): void

  public abstract deleteTask(id: Id): void

  // TODO: we may optimize: list of short details + details by certain task, ... but we wouldn't)
  public abstract getAllTasks(): ITask[]

}
