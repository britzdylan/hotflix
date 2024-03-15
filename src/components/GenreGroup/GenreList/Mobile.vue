<template>
  <div class="flex gap-2 snap-proximity snap-x overflow-x-auto no-scrollbar">
    <RouterLink v-for="item in shows" :key="item.id + '_show'" :to="`shows/${item.id}`">
      <ShowCard class="w-[105px]" v-bind="item"></ShowCard>
    </RouterLink>
  </div>
</template>

<script setup lang="ts">
import type { IShow } from '@/types'
import ShowCard from '@/components/Show/Card.vue'
interface props {
  shows: IShow[]
}
defineProps<props>()
</script>
