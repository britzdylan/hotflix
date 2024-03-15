<template>
  <h2 class="text-lg font-semibold">{{ name }}</h2>
  <div class="flex gap-2 my-1 items-center">
    <span class="text-sm text-neutral-300">{{ language }}</span>
    <div class="w-1 h-1 rounded-full bg-neutral-600"></div>
    <span class="text-sm text-neutral-300">{{ premieredYear }}</span>
    <div class="w-1 h-1 rounded-full bg-neutral-600"></div>
    <span class="text-sm text-neutral-300">{{ channel }}</span>
    <div class="w-1 h-1 rounded-full bg-neutral-600"></div>
    <span class="text-sm text-neutral-200">{{ seasons }} seasons</span>
  </div>
  <a
    v-if="officialSite"
    :href="officialSite"
    target="_blank"
    rel="noopener noreferrer"
    class="mb-3 w-full"
  >
    <BaseButton> Official Site </BaseButton>
  </a>
  <button
    class="mb-3 w-full h-[40px] p-4 flex items-center justify-center text-sm font-semibold bg-transparent border border-white rounded-md"
  >
    Add to Watchlist
  </button>
  <div v-html="summary" class="text-sm text-neutral-200"></div>
</template>

<script setup lang="ts">
import BaseButton from '@/components/Base/Button.vue'
import { computed } from 'vue'

interface IProps {
  name: string
  language: string
  premiered: string
  officialSite: string | null
  summary: string
  seasons: number
  webChannel: string | null
  network: string | null
}

const props = defineProps<IProps>()

const premieredYear = computed(() => {
  return new Date(props.premiered).getFullYear()
})

const channel = computed(() => {
  return props.webChannel || props.network
})
</script>

<style scoped></style>
