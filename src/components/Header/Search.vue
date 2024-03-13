<template>
  <BaseHeader class="gap-4">
    <IconsChevron class="rotate-90" />
    <input
      type="text"
      class="bg-neutral-700 placeholder:text-neutral-400 border-none text-white w-full px-4 py-3 rounded-md outline-none"
      placeholder="Search for Names, Genres. & People"
    />
  </BaseHeader>
</template>

<script setup lang="ts">
import IconsChevron from '@/components/Icons/Chevron.vue'
import BaseHeader from './Base.vue'
</script>
