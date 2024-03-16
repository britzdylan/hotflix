<template>
  <BasePageView>
    <template #header>
      <HeaderSearch @search="logSearch" />
    </template>
    <h2 class="text-xl font-semibold">{{ title }}</h2>
    <template v-if="showList.length">
      <ShowGridList v-if="!loading" :shows="showList" />
      <div v-else class="flex justify-center items-center flex-grow h-full">
        <Loader />
      </div>
    </template>
    <template v-else>
      <div class="flex justify-center items-center flex-grow h-full">No Results</div>
    </template>
  </BasePageView>
</template>

<script setup lang="ts">
import type { IShow } from '@/types'
import { computed, ref } from 'vue'
import { useShowsStore } from '@/stores/shows'
import BasePageView from '@/components/Base/PageView/index.vue'
import HeaderSearch from '@/components/Header/Search.vue'
import Loader from '@/components/Icons/Loading.vue'
import ShowGridList from '@/components/Show/GridList.vue'

const { getRecommendedShows, searchShows } = useShowsStore()

const loading = ref(false)
const isTyping = ref(false)
const searchResults = ref<IShow[]>([])
const query = ref('')

let typingTimeout = ref<number | undefined>(undefined)

const logSearch = (search: string) => {
  isTyping.value = true
  loading.value = true
  query.value = search

  if (typingTimeout.value) {
    clearTimeout(typingTimeout.value)
  }

  typingTimeout.value = setTimeout(async () => {
    isTyping.value = false
    searchResults.value = await searchShows(search)
    loading.value = false
  }, 600)
}

const showList = computed(() => {
  if (searchResults.value.length > 0 || query.value.length > 0) {
    return searchResults.value
  } else {
    return getRecommendedShows
  }
})

const title = computed(() => {
  if (searchResults.value.length > 0) {
    return 'Search results for: ' + query.value
  } else {
    return 'Recommended shows'
  }
})
</script>
