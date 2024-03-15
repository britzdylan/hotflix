<template>
  <BasePageView>
    <template #header>
      <Header />
    </template>

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
import BasePageView from '@/components/Base/PageView/index.vue'
import Header from '@/components/Header/index.vue'
import GenreGroup from '@/components/GenreGroup/index.vue'
import NavbarMobile from '@/components/Navbar/Mobile.vue'
import { useShowsStore } from '@/stores/shows'
import { storeToRefs } from 'pinia'

const showsStore = useShowsStore()
const { getGenres, getShowsByGenre } = storeToRefs(showsStore)
</script>
