<script setup lang="ts">
import BasePageViewMobile from '@/components/Base/PageView/Mobile.vue'
import ShowCard from '@/components/Show/Card.vue'
import HeaderSearch from '@/components/Header/Search.vue'
</script>

<template>
  <BasePageViewMobile>
    <template #header>
      <HeaderSearch />
    </template>
    <h2 class="text-xl font-semibold">Recommended tv shows</h2>
    <div class="grid grid-cols-2 gap-2">
      <ShowCard class="w-full" v-for="i in 10" :key="i + '_show'"></ShowCard>
    </div>
  </BasePageViewMobile>
</template>
