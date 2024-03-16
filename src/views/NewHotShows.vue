<template>
  <BasePageView>
    <template #header>
      <Header v-if="windowWidth > 768" />

      <HeaderMobileSubPage v-else class="!justify-start">
        <h2 class="text-xl font-semibold flex-grow">New & Hot tv shows</h2>
      </HeaderMobileSubPage>
    </template>
    <h2 v-if="windowWidth > 768" class="text-xl font-semibold">New & Hot tv shows</h2>
    <ShowGridList :shows="getHotNewShows" />
  </BasePageView>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useShowsStore } from '@/stores/shows'
import BasePageView from '@/components/Base/PageView/index.vue'
import Header from '@/components/Header/index.vue'
import ShowGridList from '@/components/Show/GridList.vue'
import NavbarMobile from '@/components/Navbar/Mobile.vue'
import HeaderMobileSubPage from '@/components/Header/MobileSubPage.vue'

const { getHotNewShows } = useShowsStore()

const windowWidth = ref(window.innerWidth)
</script>
