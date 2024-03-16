<template>
  <BasePageView>
    <template #header>
      <BaseHeader v-if="windowWidth > 768" />

      <HeaderMobileSubPage v-else class="!justify-start">
        <h2 class="text-xl font-semibold flex-grow">New & Hot</h2>
      </HeaderMobileSubPage>
    </template>
    <h2 v-if="windowWidth > 768" class="text-xl font-semibold">New & Hot</h2>
    <ShowGridList :shows="getHotNewShows" />
  </BasePageView>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useShowsStore } from '@/stores/shows'
import ShowGridList from '@/components/Show/GridList.vue'

const { getHotNewShows } = useShowsStore()

const windowWidth = ref(window.innerWidth)
</script>
