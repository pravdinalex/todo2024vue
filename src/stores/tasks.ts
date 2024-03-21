import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import type { Id, INewTask, ITask, TaskSortField } from '@/types/Tasks'
import type { TasksStorageApi } from '@/api/tasksStorageApi'
import { getTimestamp } from '@/helpers/dateUtils'

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
          sortDirection.value * ((a.completed ?? 0) - (b.completed ?? 0))
        )
      }
    }

    return res
  })

  // --- helpers ---

  function getTaskIndex(id: Id): number {
    return allTasks.value.findIndex((task) => task.id === id)
  }

  function nextSortDirection(current: number): number {
    if (current === 1) {
      return -1
    } else if (current === -1) {
      return 0
    } else {
      return 1
    }
  }

  // --- public ---

  async function init(_api: TasksStorageApi) {
    api = _api
  }

  async function loadAllTasks() {
    if (!api) {
      return
    }
    allTasks.value = await api.getAllTasks()
  }

  async function addTask(newTask: INewTask) {
    if (!api) {
      return
    }
    const task = await api.insertTask(newTask)
    if (task) {
      allTasks.value.push(task)
    }
  }

  async function updateTask(task: ITask) {
    if (!api) {
      return
    }
    const index = getTaskIndex(task.id)
    if (index >= 0) {
      allTasks.value[index] = {...allTasks.value[index], ...task}
      await api.updateTask(task)
    }
  }

  async function completeTask(id: Id, comlete: boolean) {
    if (!api) {
      return
    }
    const index = getTaskIndex(id)
    if (index >= 0) {
      const task = allTasks.value[index]
      task.completed = comlete ? getTimestamp() : null
      await api.updateTask(task)
    }
  }

  async function deleteTask(id: Id) {
    if (!api) {
      return
    }

    const index = getTaskIndex(id)
    if (index >= 0) {
      allTasks.value.splice(index, 1)
    }

    // Here and at other api calls: we use optimistic UI update,
    // if it's critical, if api call fail we should revert local changes
    await api.deleteTask(id)
  }

  function toggleSort(_sortBy: TaskSortField) {
    if (sortBy.value === _sortBy) {
      sortDirection.value = nextSortDirection(sortDirection.value)
    }
  }

  return {
    // methods
    init,
    loadAllTasks,
    addTask,
    updateTask,
    completeTask,
    deleteTask,
    toggleSort,
    // data
    shownTasks,
    sortBy,
    sortDirection,
  }
})
