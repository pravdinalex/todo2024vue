import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import type { Id, INewTask, ITask, TaskSortField } from '@/types/Tasks'
import type { TasksStorageApi } from '@/api/tasksStorageApi'

export const useTasksStore = defineStore('tasks', () => {

  let api: TasksStorageApi | null = null

  const allTasks = ref<ITask[]>([])

  const sortBy = ref<TaskSortField | null>(null)
  const sortDirection = ref(0)

  const shownTasks = computed<ITask[]>(() => {
    let res: ITask[] = [...allTasks.value]

    if (sortDirection.value) {
      if (sortBy.value === 'title') {
        res = res.sort((a, b) =>
          sortDirection.value * (a.title.localeCompare(b.title))
        )
      } else if (sortBy.value === 'completed') {
        res = res.sort((a, b) =>
          sortDirection.value * (a.completed ?? 0 - b.completed ?? 0)
        )
      }
    }

    return res
  })

  // ---

  function nextSortDirection(current: number): number {
    if (current === 1) {
      return -1
    } else if (current === -1) {
      return 0
    } else {
      return 1
    }
  }

  // ---

  function init(_api: TasksStorageApi) {
    api = _api
    allTasks.value = api.getAllTasks() // TODO: for now we don't need any loader, but...
  }

  function addTask(newTask: INewTask) {
    // TODO
  }

  function updateTask(task: ITask) {
    // TODO
  }

  function deleteTask(id: Id) {
    // TODO
  }

  function completeTask(comlete: boolean) {
    // TODO
  }

  function toggleSort(_sortBy: TaskSortField) {
    if (sortBy.value === _sortBy) {
      sortDirection.value = nextSortDirection(sortDirection.value)
    }
  }

  return {
    init,
    sortBy,
    shownTasks,
    toggleSort,

  }
})
