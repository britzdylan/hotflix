<template>
  <div class="flex gap-2 snap-proximity snap-x overflow-x-auto no-scrollbar">
    <ShowCard class="w-[105px]" v-for="k in 10" :key="k + '_show'"></ShowCard>
  </div>
</template>

<script setup lang="ts">
import ShowCard from '@/components/Show/Card.vue'
</script>
