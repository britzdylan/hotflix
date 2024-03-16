<template>
  <BaseHeader class="gap-4">
    <IconsChevron @click="$router.back" class="rotate-90" />
    <slot />
  </BaseHeader>
</template>

<script setup lang="ts">
import IconsChevron from '@/components/Icons/Chevron.vue'
import BaseHeader from './Base.vue'
</script>
