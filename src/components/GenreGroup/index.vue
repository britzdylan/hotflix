<template>
  <div class="flex flex-col last:pb-[85px]">
    <h2 class="leading-6 xl:mb-1 xl:text-lg font-medium">{{ genre }}</h2>
    <GenreListMobile v-if="windowWidth <= 768" :shows="shows" />
    <GenreListDesktop :shows="shows" v-else />
  </div>
</template>

<script setup lang="ts">
interface props {
  genre: string
  shows: IShow[]
}

import { ref } from 'vue'
import GenreListMobile from './GenreList/Mobile.vue'
import GenreListDesktop from './GenreList/Desktop.vue'
import type { IShow } from '@/types'

defineProps<props>()
const windowWidth = ref(window.innerWidth)
</script>

<style scoped></style>
