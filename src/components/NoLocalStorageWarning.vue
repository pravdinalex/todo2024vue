<template>
  <VaAlert
      color="warning"
      class="mb-6"
  >
    No
    <a
      href="https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage"
      target="_blank"
      class="va-link"
    >
      LocalStorage
    </a> found or turned on. LocalStorage is required for this app.
  </VaAlert>
</template>

<script setup lang="ts">
import { VaAlert } from 'vuestic-ui'
</script>
