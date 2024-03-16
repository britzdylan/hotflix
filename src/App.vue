<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useWatchListStore } from './stores/watchList'
import { onBeforeMount } from 'vue'

onBeforeMount(() => {
  const { initWatchList } = useWatchListStore()
  initWatchList()
})
</script>

<template>
  <RouterView />
</template>
