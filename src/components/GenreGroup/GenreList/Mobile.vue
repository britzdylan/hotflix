<template>
  <div class="flex gap-4 snap-proximity snap-x overflow-x-auto no-scrollbar">
    <ShowCard v-for="k in 10" :key="k + '_show'"></ShowCard>
  </div>
</template>

<script setup lang="ts">
import ShowCard from '@/components/Show/Card.vue'
</script>
