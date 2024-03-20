<template>
  <pre>{{ shownTasks }}</pre>
</template>

<script setup lang="ts">
import { LocalStorageTasksApi } from '@/api/localSstorageTasksApi'
import { useTasksStore } from '@/stores/tasks'
import { storeToRefs } from 'pinia'

const tasksStore = useTasksStore()
const {
  shownTasks
} = storeToRefs(tasksStore)

try {
  const api = new LocalStorageTasksApi()
  tasksStore.init(api) // TODO: why error?
} catch (e) {
  console.error(e)
}

</script>

<style scoped>

</style>
