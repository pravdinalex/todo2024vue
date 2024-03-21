<template>
  <section class="tasks-list">
    <h3 class="mb-2">Your tasks</h3>

    <table class="va-table va-table--clickable va-table--hoverable tasks-list__table">
      <thead>
      <tr>
        <th>#</th>
        <th>Title</th>
        <th>Created</th>
        <th>Completed</th>
      </tr>
      </thead>
      <tbody>
        <tr
          v-for="(task, i) in shownTasks"
          :key="task.id"
        >
          <td class="text-lg">{{ i + 1 }}</td>
          <td>
            <div class="text-lg">{{ task.title }}</div>
            <div class="text-sm">{{ task.description }}</div>
            <VaButton
              icon="edit"
              @click="emit('start-edit', task)"
            />
          </td>
          <td>{{ formatTimestamp(task.created) }}</td>
          <td>{{ task.completed ? formatTimestamp(task.completed) : '' }}</td>
        </tr>
      <template v-if="!shownTasks.length">
        <tr>
          <td colspan="4">No tasks to show</td>
        </tr>
      </template>
      </tbody>
    </table>

  </section>
</template>

<script setup lang="ts">
import { useTasksStore } from '@/stores/tasks'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import { LocalStorageTasksApi } from '@/api/localSstorageTasksApi'
import { formatTimestamp } from '@/helpers/dateUtils'
import type { ITask } from '@/types/Tasks'

const emit = defineEmits<{
  (e: 'start-edit', payload: ITask): void,
}>()

const tasksStore = useTasksStore()
const {
  shownTasks,
} = storeToRefs(tasksStore)

const isInitialized = ref(false)

const api = new LocalStorageTasksApi()
await tasksStore.init(api) // <- this makes component async
isInitialized.value = true

</script>

<style scoped>
.tasks-list__table {
  min-width: 600px;
}
</style>
