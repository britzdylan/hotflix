<template>
  <nav
    class="md:hidden p-4 flex items-center justify-center gap-16 fixed bottom-0 left-0 right-0 h-[80px] bg-neutral-900 text-white/50 rounded-t-xl bg-opacity-90 bg-blur z-10"
  >
    <RouterLink to="/" class="flex flex-col items-center justify-between h-10">
      <IconsHome class="h-max" />
      <small>Most Popular</small>
    </RouterLink>
    <RouterLink to="/shows/hot" class="flex flex-col items-center justify-between h-10">
      <IconsFire class="h-max" />
      <small>New & Hot</small>
    </RouterLink>
    <RouterLink to="/watchlist" class="flex flex-col items-center justify-between h-10">
      <IconsPlay class="h-max" />
      <small>My watch list</small>
    </RouterLink>
  </nav>
</template>

<script setup lang="ts">
import IconsHome from '@/components/Icons/Home.vue'
import IconsFire from '@/components/Icons/Fire.vue'
import IconsPlay from '@/components/Icons/Play.vue'
</script>

<style scoped></style>
