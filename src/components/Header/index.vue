<template>
  <BaseHeader>
    <h1 class="font-semibold text-xl">For Dylan</h1>
    <RouterLink to="/search">
      <IconsSearch />
    </RouterLink>
  </BaseHeader>
</template>

<script setup lang="ts">
import IconsSearch from '@/components/Icons/Search.vue'
import BaseHeader from './Base.vue'
</script>
