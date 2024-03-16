<template>
  <BasePageView>
    <template #header>
      <HeaderSearch />
    </template>
    <h2 class="text-xl font-semibold">Recommended tv shows</h2>
    <ShowGridList v-if="!loading" :shows="getRecommendedShows" />
    <div v-else class="flex justify-center items-center flex-grow h-full">
      <Loader />
    </div>
  </BasePageView>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useShowsStore } from '@/stores/shows'
import BasePageView from '@/components/Base/PageView/index.vue'
import HeaderSearch from '@/components/Header/Search.vue'
import Loader from '@/components/Icons/Loading.vue'
import ShowGridList from '@/components/Show/GridList.vue'

const { getRecommendedShows } = useShowsStore()

const loading = ref(false)
</script>
