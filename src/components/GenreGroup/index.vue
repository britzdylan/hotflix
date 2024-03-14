<template>
  <div class="flex flex-col gap-2 last:pb-[85px]">
    <h2 class="text-lg font-semibold leading-3">Drama</h2>
    <GenreListMobile v-if="windowWidth <= 768" />
    <GenreListDesktop v-else />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import GenreListMobile from './GenreList/Mobile.vue'
import GenreListDesktop from './GenreList/Desktop.vue'

const windowWidth = ref(window.innerWidth)
</script>

<style scoped></style>
