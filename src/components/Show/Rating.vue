<template>
  <div class="inline-flex items-start">
    <IconsStar />

    <span class="text-2xl font-semibold ml-1 leading-6">{{ rating }}</span>
    <span class="text-sm text-neutral-300 leading-4">/10</span>
  </div>
</template>

<script setup lang="ts">
import IconsStar from '@/components/Icons/Star.vue'

interface IProps {
  rating: number
}
defineProps<IProps>()
</script>
