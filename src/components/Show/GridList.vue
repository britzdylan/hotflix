<template>
  <div class="grid grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-7 gap-2 lg:gap-4">
    <ListingCard
      class="cursor-pointer max-w-[280px] hover:scale-95 hover:outline outline-2 outline-offset-1 outline-neutral-50 transition-transform duration-300 ease-out"
      @click="navigateToShow(i.id)"
      v-for="i in shows"
      :key="i + '_show'"
      v-bind="i"
    ></ListingCard>
  </div>
</template>

<script setup lang="ts">
import type { IShow } from '@/types'
import { useRouter } from 'vue-router'
import { usePopup } from '@/composables/popup'
import ListingCard from '@/components/Show/ListingCard.vue'

interface IProps {
  shows: IShow[]
}

defineProps<IProps>()

const { showPopup } = usePopup()
const router = useRouter()

const navigateToShow = (id: number) => {
  if (window.innerWidth > 768) {
    showPopup(`show_${id}`)
  } else {
    router.push(`/shows/${id}`)
  }
}
</script>

<style scoped></style>
