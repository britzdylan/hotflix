<template>
  <div
    :class="[
      'aspect-[210/295] bg-neutral-200 rounded-md overflow-hidden snap-start lg:snap-end shrink-0',
      size
    ]"
  >
    <img
      src="https://static.tvmaze.com/uploads/images/medium_portrait/81/202627.jpg"
      alt="Show Image"
      class="w-full object-cover object-center"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  size: 'large' | 'small'
}

const props = withDefaults(defineProps<Props>(), {
  size: 'small'
})

const size = computed(() => {
  return props.size === 'small' ? 'w-[210px]' : 'w-[295px]'
})
</script>

<style scoped></style>
