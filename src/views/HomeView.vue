<template>
  <BasePageView>
    <template #header>
      <Header />
    </template>
    <h2 class="hidden lg:block text-3xl font-bold font-display mt-12">Most popular tv shows</h2>

    <GenreGroup
      v-for="i in getGenres"
      v-bind="{
        genre: i,
        shows: getShowsByGenre(i)
      }"
    />

    <template #footer>
      <NavbarMobile />
    </template>
  </BasePageView>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useShowsStore } from '@/stores/shows'
import BasePageView from '@/components/Base/PageView/index.vue'
import Header from '@/components/Header/index.vue'
import GenreGroup from '@/components/GenreGroup/index.vue'
import NavbarMobile from '@/components/Navbar/Mobile.vue'

const showsStore = useShowsStore()
const { getGenres, getShowsByGenre } = storeToRefs(showsStore)
</script>
