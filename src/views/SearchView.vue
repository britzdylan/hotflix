<template>
  <BasePageViewMobile>
    <template #header>
      <HeaderSearch />
    </template>
    <h2 class="text-xl font-semibold">Recommended tv shows</h2>
    <div v-if="!loading" class="grid grid-cols-3 gap-2">
      <ShowCard class="w-full" v-for="i in 12" :key="i + '_show'"></ShowCard>
    </div>
    <div v-else class="flex justify-center items-center h-[calc(100vh-200px)]">
      <Loader />
    </div>
  </BasePageViewMobile>
</template>

<script setup lang="ts">
import BasePageViewMobile from '@/components/Base/PageView/Mobile.vue'
import ShowCard from '@/components/Show/Card.vue'
import HeaderSearch from '@/components/Header/Search.vue'
import Loader from '@/components/Icons/Loading.vue'
import { ref } from 'vue'

const loading = ref(false)
</script>
