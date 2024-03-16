<template>
  <BaseHeader>
    <RouterLink to="/">
      <img src="/logo.svg" alt="Logo" class="w-24" />
    </RouterLink>
    <ul class="hidden md:flex gap-8 text-sm font-semibold text-white/50">
      <li>
        <RouterLink class="hover:text-neutral-300" to="/">Home</RouterLink>
      </li>
      <li>
        <RouterLink class="hover:text-neutral-300" to="/watchlist">Watchlist</RouterLink>
      </li>
      <li>
        <RouterLink class="hover:text-neutral-300" to="/shows/hot">New & hot</RouterLink>
      </li>
    </ul>
    <RouterLink to="/search">
      <IconsSearch />
    </RouterLink>
  </BaseHeader>
</template>

<script setup lang="ts">
import IconsSearch from '@/components/Icons/Search.vue'
import BaseHeader from './Base.vue'
</script>
