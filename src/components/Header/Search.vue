<template>
  <BaseHeader class="gap-4">
    <IconsChevron @click="$router.back" class="rotate-90" />
    <input
      @input="$emit('search', ($event.target as HTMLInputElement)?.value)"
      type="search"
      class="bg-neutral-700 placeholder:text-neutral-400 border-none text-white w-full px-4 py-3 rounded-md outline-none"
      placeholder="Search for show names"
    />
  </BaseHeader>
</template>

<script setup lang="ts">
import { defineEmits } from 'vue'
import IconsChevron from '@/components/Icons/Chevron.vue'
import BaseHeader from './Base.vue'

const emits = defineEmits(['search'])
</script>
