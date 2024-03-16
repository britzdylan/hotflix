<template>
  <div v-if="rating" class="inline-flex items-start">
    <IconsStar />
    <p class="text-2xl font-semibold ml-1 leading-6">{{ rating }}</p>
    <p class="text-sm text-neutral-300 leading-4">/10</p>
  </div>
</template>

<script setup lang="ts">
import IconsStar from '@/components/Icons/Star.vue'

interface IProps {
  rating: number
}
defineProps<IProps>()
</script>
