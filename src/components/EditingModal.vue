<template>
  <VaModal
    :modelValue="true"
    size="small"
    @ok="submit"
    @cancel="close"
    @close="close"
    ok-text="Save"
  >
    <h3 class="mb-4">{{ modalTitle }}</h3>
    <VaForm class="flex flex-col gap-4">
      <VaInput
        v-model="currentState.title"
        :placeholder="props.task ? props.task.title : ''"
        label="Task title"
        immediate-validation
        :error="!validation.isTitleOk"
        :error-messages="`Type something meaningful longer than ${MIN_TEXT_LENGTH} symbols`"
        @edit="validation.isTitleOk = true"
      />
      <VaTextarea
        v-model="currentState.description"
        label="Task description"
        immediate-validation
        :error="!validation.isDescriptionOk"
        :error-messages="`Type something meaningful longer than ${MIN_TEXT_LENGTH} symbols`"
        @edit="validation.isDescriptionOk = true"
      />
    </VaForm>
  </VaModal>
</template>

<script setup lang="ts">
import { reactive, watch, computed } from 'vue'
import { VaForm, VaInput, VaTextarea, VaModal } from 'vuestic-ui'
import type { INewTask, ITask } from '@/types/Tasks'
import { useTasksStore } from '@/stores/tasks'

const MIN_TEXT_LENGTH = 5

const tasksStore = useTasksStore()

const props = defineProps<{
  // isOpened: boolean,
  task: ITask | null,
}>()

const emit = defineEmits<{
  (e: 'close'): void,
}>()

const currentState = reactive<INewTask>({
  title: '',
  description: '',
})

const validation = reactive({
  isTitleOk: true,
  isDescriptionOk: true,
})

watch(() => props.task, (task) => {
  if (task) {
    currentState.title = task.title
    currentState.description = task.description
  } else {
    currentState.title = ''
    currentState.description = ''
  }
}, {
  immediate: true,
})

const modalTitle = computed<string>(() =>
  props.task ? 'Editing task' : 'New task'
)

// ---

function close() {
  emit('close')
}

async function submit() {
  // TODO: replace with validation provided by vuestic-ui

  validation.isTitleOk = currentState.title.trim().length >= 5
  validation.isDescriptionOk = currentState.description.trim().length >= 5

  if (!validation.isTitleOk || !validation.isDescriptionOk) {
    return
  }

  close()
  if (props.task) {
    await tasksStore.updateTask({...props.task, ...currentState})
  } else {
    await tasksStore.addTask({...currentState})
  }
}

</script>
