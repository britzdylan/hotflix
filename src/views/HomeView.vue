<template>
  <BasePageView>
    <template #header>
      <BaseHeader />
    </template>

    <h2 class="text-xl font-semibold">Most Highly Rated</h2>

    <GenreGroup v-for="i in getShowsByGenre" v-bind="i" :key="i.genre" />

    <template #footer>
      <NavbarMobile />
    </template>
  </BasePageView>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useShowsStore } from '@/stores/shows'
import GenreGroup from '@/components/GenreGroup/index.vue'

const showsStore = useShowsStore()
const { getShowsByGenre } = storeToRefs(showsStore)
</script>
