<template>
  <Suspense>
    <div class="app p-4">
      <header class="flex align-center justify-space-between mb-4">
        <h1 class="mb-2 mr-auto text-2xl">Your tasks</h1>
        <div class="!grow-0">
          <VaButton
            class="mr-4"
            preset="secondary"
            border-color="secondary"
            icon="checklist"
            icon-color="danger"
            text-color="secondary"
            @click="editing.active = true"
          >
            Delete...
          </VaButton>
          <VaButton
            @click="editing.active = true"
            icon="add"
            color="info"
          >
            New task
          </VaButton>
        </div>
      </header>
      <main>
        <TasksList
          @start-edit="startEditing"
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
import { ITask } from '@/types/Tasks'

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

</script>

<style scoped>
.app {
  max-width: 1000px;
}
</style>
