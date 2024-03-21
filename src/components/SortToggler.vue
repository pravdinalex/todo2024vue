<template>
  <div>
    <VaButton
      v-if="sortDirection === 0 || sortBy !== props.field"
      icon="swap_vert"
      size="small"
      preset="secondary"
      icon-color="info"
      @click="sort"
    />
    <VaButton
      v-if="sortDirection === 1 && sortBy === props.field"
      icon="north"
      size="small"
      preset="secondary"
      icon-color="primary"
      @click="sort"
    />
    <VaButton
      v-if="sortDirection === -1 && sortBy === props.field"
      icon="south"
      size="small"
      preset="secondary"
      icon-color="primary"
      @click="sort"
    />
  </div>
</template>

<script setup lang="ts">
import { VaButton } from 'vuestic-ui'
import { useTasksStore } from '@/stores/tasks'
import { storeToRefs } from 'pinia'
import { TaskSortField } from '@/types/Tasks'

const tasksStore = useTasksStore()

const {
  sortBy,
  sortDirection,
} = storeToRefs(tasksStore)

const props = defineProps<{
  field: TaskSortField,
}>()

function sort() {
  tasksStore.toggleSort(props.field)
}

</script>
