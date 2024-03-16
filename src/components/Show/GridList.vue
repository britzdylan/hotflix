<template>
  <div class="grid grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-7 gap-2 lg:gap-4">
    <ShowCard
      class="cursor-pointer max-w-[280px] hover:scale-95 hover:outline outline-2 outline-offset-1 outline-neutral-50 transition-transform duration-300 ease-out"
      @click="navigateToShow(i.id)"
      v-for="i in shows"
      :key="i + '_show'"
      v-bind="i"
    ></ShowCard>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { usePopup } from '@/composables/popup'
import ShowCard from '@/components/Show/Card.vue'
import type { IShow } from '@/types'

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
