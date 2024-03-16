<template>
  <BaseButton
    @click="handleWishListListing"
    class="!bg-transparent !border !border-white text-white"
  >
    {{ buttonTitle }}
  </BaseButton>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useWatchListStore } from '@/stores/watchList'

const { addToWatchList, WatchList, removeFromWatchList } = useWatchListStore()
interface IProps {
  showId: number
}

const props = defineProps<IProps>()

const isAdded = computed(() => WatchList.includes(props.showId))
const buttonTitle = computed(() => (isAdded.value ? 'Remove from watch list' : 'Add to watch list'))

const handleWishListListing = () => {
  if (isAdded.value) {
    removeFromWatchList(props.showId)
  } else {
    addToWatchList(props.showId)
  }
}
</script>
