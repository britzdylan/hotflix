<script setup lang="ts">
import Header from '@/components/Header/index.vue'
import GenreGroup from '@/components/GenreGroup/index.vue'
import NavbarMobile from '@/components/Navbar/Mobile.vue'
import { ref, onMounted } from 'vue'
</script>

<template>
  <main class="bg-white">
    <Header />
    <section class="p-4 flex flex-col gap-4">
      <GenreGroup v-for="i in 10" />
    </section>
    <NavbarMobile />
  </main>
</template>
