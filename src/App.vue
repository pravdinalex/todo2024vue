<template>
  <Suspense>
    <main class="p-4">
      <VaButton
        @click="editing.active = true"
        icon="add"
        color="info"
        class="mb-4"
      >
        New task
      </VaButton>
      <TasksList
        @start-edit="startEditing"
      />
      <EditingModal
        v-if="editing.active"
        :task="editing.task"
        @close="editing.active = false"
      />
    </main>
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

</script>

<style scoped>

</style>
