<template>
  <BasePageView>
    <template #header>
      <HeaderMobileSubPage class="!justify-start">
        <input
          v-model="query"
          @input="startSearch"
          type="search"
          class="bg-neutral-700 placeholder:text-neutral-400 border-none text-white w-full px-4 py-3 rounded-md outline-none"
          placeholder="Search for show names"
        />
      </HeaderMobileSubPage>
    </template>
    <h2 class="text-xl font-semibold">{{ title }}</h2>
    <template v-if="!loading">
      <ShowGridList v-if="showList.length" :shows="showList" />
      <div v-else class="flex justify-center items-center flex-grow h-full">No Results</div>
    </template>
    <template v-else>
      <div class="flex justify-center items-center flex-grow h-full">
        <LoaderIcon />
      </div>
    </template>
  </BasePageView>
</template>

<script setup lang="ts">
import ShowGridList from '@/components/Show/GridList.vue'

import { useShowSearch } from '@/composables/showSearch'

const { query, showList, loading, startSearch, title } = useShowSearch()
</script>
