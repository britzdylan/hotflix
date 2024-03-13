<script setup lang="ts">
import Header from '@/components/Header/index.vue'
import GenreGroup from '@/components/GenreGroup/index.vue'
import NavbarMobile from '@/components/Navbar/Mobile.vue'
import { ref, onMounted } from 'vue'
</script>

<template>
  <main class="bg-neutral-950 text-white">
    <Header />
    <section class="p-4 pb-[85px] flex flex-col gap-4">
      <GenreGroup v-for="i in 10" />
    </section>
    <NavbarMobile />
  </main>
</template>
