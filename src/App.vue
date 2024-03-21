<template>
  <Suspense>
    <div class="app p-4">
      <header class="flex align-center justify-space-between mb-4">
        <h1 class="mb-2 mr-auto text-2xl">Your tasks</h1>
        <div class="!grow-0">
          <VaButton
            v-if="!deletion.active"
            class="mr-4"
            preset="secondary"
            border-color="secondary"
            icon="checklist"
            icon-color="danger"
            text-color="secondary"
            @click="startDeletion"
          >
            Delete...
          </VaButton>

          <template v-if="deletion.active">
            <VaButton
              class="mr-4"
              preset="secondary"
              border-color="secondary"
              text-color="secondary"
              icon="undo"
              @click="stopDeletion"
            >
              Cancel deletion
            </VaButton>

            <VaButton
              :disabled="!deletion.ids.length"
              class="mr-4"
              color="danger"
              icon="delete"
              @click="doDelete"
            >
              Delete
            </VaButton>
          </template>

          <VaButton
            v-if="!deletion.active"
            icon="add"
            color="info"
            @click="editing.active = true"
          >
            New task
          </VaButton>
        </div>
      </header>
      <main>
        <TasksList
          :delete-mode="deletion.active"
          @start-edit="startEditing"
          @delete-selection="deletion.ids = $event"
        />
        <EditingModal
          v-if="editing.active"
          :task="editing.task"
          @close="stopEditing"
        />
      </main>
    </div>
    <template #fallback>
      Loading...
    </template>
  </Suspense>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { VaButton } from 'vuestic-ui'
import TasksList from '@/components/TasksList.vue'
import EditingModal from '@/components/EditingModal.vue'
import type { ITask, Id } from '@/types/Tasks'
import { useTasksStore } from '@/stores/tasks'

const tasksStore = useTasksStore()

// TODO: edition and deletion may be extracted to composables/stores

// --- edition ---

const editing = reactive<{
  active: boolean,
  task: ITask | null,
}>({
  active: false,
  task: null,
})

function startEditing(task: ITask) {
  editing.task = task
  editing.active = true
}

function stopEditing() {
  editing.task = null
  editing.active = false
}

// --- deletion ---

const deletion = reactive<{
  active: boolean,
  ids: Id[],
}>({
  active: false,
  ids: [],
})

function startDeletion() {
  deletion.active = true
  deletion.ids = []
}

function doDelete() {
  deletion.ids.forEach(tasksStore.deleteTask)
  stopDeletion()
}

function stopDeletion() {
  deletion.active = false
  deletion.ids = []
}

</script>

<style scoped>
.app {
  max-width: 1000px;
}
</style>
