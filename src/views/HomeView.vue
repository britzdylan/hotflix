<script setup lang="ts">
import BasePageViewMobile from '@/components/Base/PageView/Mobile.vue'
import Header from '@/components/Header/index.vue'
import GenreGroup from '@/components/GenreGroup/index.vue'
import NavbarMobile from '@/components/Navbar/Mobile.vue'
</script>

<template>
  <BasePageViewMobile>
    <template #header>
      <Header />
    </template>

    <GenreGroup v-for="i in 10" />

    <template #footer>
      <NavbarMobile />
    </template>
  </BasePageViewMobile>
</template>
