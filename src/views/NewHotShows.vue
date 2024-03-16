<template>
  <BasePageView>
    <template #header>
      <Header />
    </template>
    <h2 class="text-xl font-semibold">New & Hot tv shows</h2>
    <ShowGridList :shows="getHotNewShows" />
  </BasePageView>
</template>

<script setup lang="ts">
import { useShowsStore } from '@/stores/shows'
import BasePageView from '@/components/Base/PageView/index.vue'
import Header from '@/components/Header/index.vue'
import ShowGridList from '@/components/Show/GridList.vue'

const { getHotNewShows } = useShowsStore()
</script>
