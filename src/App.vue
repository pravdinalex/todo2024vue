<template>
  <pre>{{ shownTasks }}</pre>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { LocalStorageTasksApi } from '@/api/localSstorageTasksApi'
import { useTasksStore } from '@/stores/tasks'
import { storeToRefs } from 'pinia'

const tasksStore = useTasksStore()
const {
  shownTasks,
} = storeToRefs(tasksStore)

const isInitialized = ref(false)
const isLoaded = ref(false)

try {
  const api = new LocalStorageTasksApi()
  await tasksStore.init(api)
  isInitialized.value = true
} catch (e) {
  console.error(e)
} finally {
  isLoaded.value = true
}

</script>

<style scoped>

</style>
