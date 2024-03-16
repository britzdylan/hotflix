<template>
  <div class="inline-flex items-start">
    <template v-if="rating">
      <IconsStar />
      <p class="text-2xl font-semibold ml-1 leading-6">{{ rating }}</p>
      <p class="text-sm text-neutral-300 leading-4">/10</p>
    </template>
  </div>
</template>

<script setup lang="ts">
import IconsStar from '@/components/Icons/Star.vue'

interface IProps {
  rating: number
}
defineProps<IProps>()
</script>
