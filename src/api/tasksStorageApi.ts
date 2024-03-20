import type { Id, INewTask, ITask } from '@/types/Tasks'

export abstract class TasksStorageApi {

  public abstract insertTask(newTask: INewTask): Promise<ITask>

  public abstract updateTask(task: ITask): Promise<void>

  public abstract deleteTask(id: Id): Promise<void>

  // TODO: we may optimize: list of short details + details by certain task, ... but we wouldn't)
  public abstract getAllTasks(): Promise<ITask[]>

}
