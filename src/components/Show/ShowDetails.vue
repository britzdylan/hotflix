<template>
  <h2 class="text-lg font-semibold">{{ name }}</h2>
  <div class="flex gap-2 my-1 items-center flex-wrap">
    <span class="text-sm text-neutral-300">{{ language ?? 'Unknown' }}</span>
    <div class="w-1 h-1 rounded-full bg-neutral-600"></div>
    <span class="text-sm text-neutral-300">{{ premieredYear() }}</span>
    <div class="w-1 h-1 rounded-full bg-neutral-600"></div>
    <span class="text-sm text-neutral-300">{{ channel() }}</span>
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
  <WatchListAddButton :showId="showId" />
  <div v-html="summary" class="text-sm text-neutral-200"></div>
</template>

<script setup lang="ts">
import WatchListAddButton from '@/components/WatchList/AddButton.vue'

interface IProps {
  showId: number
  name: string
  language: string | null
  premiered: string
  officialSite: string | null
  summary: string
  seasons: number
  webChannel: string | null
  network: string | null
}

const props = defineProps<IProps>()

const premieredYear = () => {
  return new Date(props.premiered).getFullYear()
}

const channel = () => {
  return props.webChannel || props.network
}
</script>

<style scoped></style>
