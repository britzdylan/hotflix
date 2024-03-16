<template>
  <div class="flex gap-2 snap-proximity snap-x overflow-x-auto no-scrollbar">
    <RouterLink v-for="item in shows" :key="item.id + '_show'" :to="`shows/${item.id}`">
      <ListingCard class="w-[105px]" v-bind="item"></ListingCard>
    </RouterLink>
  </div>
</template>

<script setup lang="ts">
import type { IShow } from '@/types'
import ListingCard from '@/components/Show/ListingCard.vue'
interface IProps {
  shows: IShow[]
}
defineProps<IProps>()
</script>
