<template>
  <BasePageView>
    <template #header>
      <Header v-if="windowWidth > 768" />

      <HeaderMobileSubPage v-else class="!justify-start">
        <h2 class="text-xl font-semibold flex-grow">My Watch List</h2>
      </HeaderMobileSubPage>
    </template>
    <ShowGridList v-if="getWatchListShows.length" :shows="getWatchListShows" />
    <template v-else>
      <div class="flex justify-center items-center flex-grow h-full">
        Add some more shows to your watch list
      </div>
    </template>
  </BasePageView>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useWatchListStore } from '@/stores/watchList'
import BasePageView from '@/components/Base/PageView/index.vue'
import HeaderMobileSubPage from '@/components/Header/MobileSubPage.vue'
import ShowGridList from '@/components/Show/GridList.vue'
import Header from '@/components/Header/index.vue'

const { getWatchListShows } = useWatchListStore()

const windowWidth = ref(window.innerWidth)
</script>
