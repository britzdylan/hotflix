<template>
  <div class="inline-flex items-center gap-2">
    <div :class="['h-2 w-2 rounded-full', showStatusColor]"></div>
    <span class="text-sm">{{ showStatus }}</span>
  </div>
</template>

<script setup lang="ts">
import { computed, defineProps } from 'vue'
interface IProps {
  status: string | null
}

const props = defineProps<IProps>()

const showStatus = computed(() => {
  return props.status ? 'Ended' : 'Running'
})

const showStatusColor = computed(() => {
  return props.status ? 'bg-yellow-500' : 'bg-green-500'
})
</script>
