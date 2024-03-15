<template>
  <div class="flex flex-col gap-2 last:pb-[85px]">
    <h2 class="text-lg font-semibold leading-3">{{ genre }}</h2>
    <GenreListMobile v-if="windowWidth <= 768" :shows="shows" />
    <GenreListDesktop v-else />
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
