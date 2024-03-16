<template>
  <BasePageView>
    <template #header>
      <Header />
    </template>
    <h2 class="text-lg lg:text-3xl font-bold font-display lg:mt-12">Most popular tv shows</h2>

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
