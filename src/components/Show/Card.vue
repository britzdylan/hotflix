<template>
  <div
    class="aspect-[210/295] bg-neutral-200 rounded-md overflow-hidden snap-start lg:snap-end shrink-0"
  >
    <img
      v-if="image"
      loading="lazy"
      :src="image"
      :alt="name"
      class="w-full object-cover object-center"
    />
  </div>
</template>

<script setup lang="ts">
import type { IShow } from '@/types'

defineProps<IShow>()
</script>

<style scoped></style>
