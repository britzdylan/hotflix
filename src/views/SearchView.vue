<template>
  <BasePageView>
    <template #header>
      <HeaderSearch />
    </template>
    <h2 class="text-xl font-semibold">Recommended tv shows</h2>
    <div v-if="!loading" class="grid grid-cols-3 lg:grid-cols-4 gap-2 lg:gap-4">
      <ShowCard
        class="cursor-pointer hover:scale-95 hover:outline outline-2 outline-offset-1 outline-neutral-50 transition-transform duration-300 ease-out"
        @click="showPopup(`show_${i.id}`)"
        v-for="i in getHotNewShows"
        :key="i + '_show'"
        v-bind="i"
      ></ShowCard>
    </div>
    <div v-else class="flex justify-center items-center flex-grow h-full">
      <Loader />
    </div>
  </BasePageView>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import BasePageView from '@/components/Base/PageView/index.vue'
import ShowCard from '@/components/Show/Card.vue'
import HeaderSearch from '@/components/Header/Search.vue'
import Loader from '@/components/Icons/Loading.vue'
import { useShowsStore } from '@/stores/shows'
import { usePopup } from '@/composables/popup'

const { showPopup } = usePopup()

const { getHotNewShows } = useShowsStore()

const loading = ref(false)
</script>
