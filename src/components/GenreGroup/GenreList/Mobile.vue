<template>
  <div ref="container" class="flex gap-2 snap-proximity snap-x overflow-x-auto no-scrollbar">
    <RouterLink
      v-for="(item, index) in shows"
      :key="item.id + '_show'"
      :to="`shows/${item.id}`"
      :class="genre + '_listing_card_' + index"
    >
      <ListingCard class="w-[105px]" v-bind="item"></ListingCard>
    </RouterLink>
  </div>
</template>

<script setup lang="ts">
import type { IShow } from '@/types'
import { onMounted, ref, computed, onUnmounted } from 'vue'
import { useShowsStore } from '@/stores/shows'
import ListingCard from '@/components/Show/ListingCard.vue'

interface IProps {
  genre: string
  shows: IShow[]
}
const props = defineProps<IProps>()
const container = ref<HTMLElement>()
const length = computed(() => props.shows.length)
onMounted(() => {
  container.value?.addEventListener('scroll', traverse)
})

onUnmounted(() => {
  container.value?.removeEventListener('scroll', traverse)
})
const { traverseShowsPerGenre } = useShowsStore()

const traverse = () => {
  const el = document.getElementsByClassName(
    `${props.genre}_listing_card_${length.value - 5}`
  )[0] as HTMLElement
  const containerRight = container.value?.getBoundingClientRect().right
  const elRight = el?.getBoundingClientRect().right
  if (containerRight && containerRight > elRight) {
    traverseShowsPerGenre(props.genre)
  }
}
</script>
