<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useWatchListStore } from './stores/watchList'
import { useShowsStore } from './stores/shows'
import { onBeforeMount } from 'vue'

onBeforeMount(() => {
  const { initWatchList } = useWatchListStore()
  const { prepareMostPopularShows } = useShowsStore()
  initWatchList()
  prepareMostPopularShows()
})
</script>

<template>
  <RouterView />
</template>
