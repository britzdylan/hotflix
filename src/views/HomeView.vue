<script setup lang="ts">
import TheHeader from '@/components/Base/Header.vue'
import GenreGroup from '@/components/GenreGroup/index.vue'
import { ref, onMounted } from 'vue'
</script>

<template>
  <main class="bg-white">
    <TheHeader />
    <section class="p-4 flex flex-col gap-4">
      <GenreGroup v-for="i in 10" />
    </section>
  </main>
</template>
