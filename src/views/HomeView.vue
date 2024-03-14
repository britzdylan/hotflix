<script setup lang="ts">
import BasePageView from '@/components/Base/PageView/index.vue'
import Header from '@/components/Header/index.vue'
import GenreGroup from '@/components/GenreGroup/index.vue'
import NavbarMobile from '@/components/Navbar/Mobile.vue'
</script>

<template>
  <BasePageView>
    <template #header>
      <Header />
    </template>

    <GenreGroup v-for="i in 10" />

    <template #footer>
      <NavbarMobile />
    </template>
  </BasePageView>
</template>
