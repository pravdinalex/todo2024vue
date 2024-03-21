<template>
  <table class="va-table va-table--clickable va-table--hoverable w-full">
    <thead>
    <tr>
      <th>#</th>
      <th>Title / Description</th>
      <th>Created</th>
      <th>Completed</th>
      <th v-if="props.deleteMode">For deletion</th>
    </tr>
    </thead>
    <tbody>
      <tr
        v-for="(task, i) in shownTasks"
        :key="task.id"
      >
        <td class="text-lg">{{ i + 1 }}</td>
        <td>
          <div class="flex justify-space-between">
            <div>
              <div class="text-lg font-bold">{{ task.title }}</div>
              <div class="text-sm truncate max-w-sm">{{ task.description }}</div>
            </div>
            <VaButton
              class="align-self-start !grow-0"
              icon="edit"
              preset="secondary"
              text-color="info"
              size="small"
              @click="emit('start-edit', task)"
            >
              edit
            </VaButton>
          </div>
        </td>
        <td>{{ formatTimestamp(task.created) }}</td>
        <td>
          <div class="flex align-center">
            <VaButton
              v-if="!task.completed"
              class="ml-auto !grow-0"
              icon="check"
              preset="secondary"
              size="small"
              text-color="info"
              @click="completeTask(task.id, true)"
            >
              complete
            </VaButton>

            <template v-else>
              <VaIcon
                class="material-icons !grow-0 mr-2 font-bold"
                color="success"
                size="large"
              >
                check
              </VaIcon>
              <span class="mr-4 font-bold">{{ formatTimestamp(task.completed) }}</span>
              <VaButton
                class="align-self-center !grow-0 ml-auto"
                icon="undo"
                preset="secondary"
                size="small"
                text-color="info"
                title="mark incomplete"
                @click="completeTask(task.id, false)"
              >
                undo
              </VaButton>
            </template>
          </div>
        </td>

        <td v-if="props.deleteMode">
          <VaCheckbox
            v-model="deleteSelection"
            :array-value="task.id"
            color="danger"
          />
        </td>
      </tr>
      <tr
        v-if="!shownTasks.length"
        :key="'nothing-to-show'"
      >
        <td
          :colspan="props.deleteMode ? 5 : 4"
          class="va-text-center"
        >
          <div class="inline-flex align-center justify-center">
            <VaIcon class="material-icons mr-4" color="info">info</VaIcon>
            No tasks to show
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
import { useTasksStore } from '@/stores/tasks'
import { storeToRefs } from 'pinia'
import { ref, watch } from 'vue'
import { VaIcon, VaCheckbox } from 'vuestic-ui'
import { LocalStorageTasksApi } from '@/api/localSstorageTasksApi'
import { formatTimestamp } from '@/helpers/dateUtils'
import type { ITask, Id } from '@/types/Tasks'

const props = defineProps<{
  deleteMode: boolean,
}>()

const emit = defineEmits<{
  (e: 'start-edit', payload: ITask): void,
  (e: 'delete-selection', payload: Id[]): void,
}>()

const tasksStore = useTasksStore()
const {
  shownTasks,
} = storeToRefs(tasksStore)

const isInitialized = ref(false)

const deleteSelection = ref<Id[]>([])

watch(() => props.deleteMode, () => {
  deleteSelection.value = []
})

watch(deleteSelection, (ids: Id[]) => {
  emit('delete-selection', ids)
})

const api = new LocalStorageTasksApi()
await tasksStore.init(api) // <- this makes component async
isInitialized.value = true

function completeTask(id: Id, completed: boolean) {
  tasksStore.completeTask(id, completed)
}
</script>
