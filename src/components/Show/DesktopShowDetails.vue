<template>
  <div
    class="fixed bottom-0 left-0 right-0 top-0 w-full bg-neutral-950/60 bg-blur z-50 mx-auto flex items-center justify-center"
  >
    <section
      class="max-w-screen-md relative rounded-md overflow-hidden shadow-lg bg-neutral-950 max-h-[80vh] flex flex-col w-full"
    >
      <IconsX class="absolute top-2 right-2 z-20" @click="closePopup" />
      <ShowStatus v-if="showData" :status="showData.ended" class="absolute top-5 left-8 z-20" />
      <ShowRating v-if="showData" :rating="showData.rating" class="absolute top-12 left-8 z-20" />
      <div class="relative overflow-hidden flex-grow h-96">
        <BaseGradientCover class="rotate-180" />

        <ShowSlideShow
          v-if="images.length"
          containerClass="h-96"
          imageClass="w-full"
          :images="images"
        />
        <p v-else class="text-center text-neutral-400 p-8 m-auto">No images available</p>
      </div>
      <div class="bg-neutral-950 p-8 flex flex-col gap-4">
        <ShowDetails
          v-if="showData"
          :showId="showData.id"
          :name="showData.name"
          :language="showData.language"
          :premiered="showData.premiered"
          :officialSite="showData.officialSite"
          :summary="showData.summary"
          :seasons="showData.seasons"
          :webChannel="showData.webChannel"
          :network="showData.network"
        />
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import IconsX from '@/components/Icons/X.vue'
import type { IShowDetailed } from '@/types'
import { ref, computed, onMounted, onBeforeMount } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { usePopup } from '@/composables/popup'
import { useShowsStore } from '@/stores/shows'
import ShowDetails from './ShowDetails.vue'
import BaseGradientCover from '@/components/Base/GradientCover.vue'
import ShowRating from './Rating.vue'
import ShowStatus from './Status.vue'
import ShowSlideShow from './SlideShow.vue'

const route = useRoute()
const router = useRouter()
const { getShowById } = useShowsStore()
const { popup, closePopup } = usePopup()

const images = computed(
  () => showData.value?.images.filter((i) => i.type === 'background').map((i) => i.image) || []
)

const idParam = popup.value?.split('_')[1]

const showId = idParam
  ? Number(idParam)
  : Array.isArray(route.params.id)
    ? Number(route.params.id[0])
    : Number(route.params.id)

const isLoading = ref(true)
const showData = ref<IShowDetailed | null>(null)

onBeforeMount(async () => {
  showData.value = await getShowById(showId)
  isLoading.value = false
})

onMounted(async () => {
  console.log('mounted')
  console.log(route.query.popup)
})
</script>

<style scoped></style>
