<template>
  <div
    class="fixed bottom-0 left-0 right-0 top-0 w-full bg-neutral-950/60 bg-blur z-50 mx-auto flex items-center justify-center"
  >
    <section
      class="max-w-screen-md relative rounded-md overflow-hidden shadow-lg bg-neutral-950 max-h-[80vh] flex flex-col w-full"
    >
      <IconsX class="absolute top-2 right-2 z-20" @click="closePopup" />
      <template v-if="showDetails">
        <ShowStatusTextIcon :status="showDetails.ended" class="absolute top-5 left-8 z-20" />
        <ShowAverageRating :rating="showDetails.rating" class="absolute top-12 left-8 z-20" />
      </template>
      <div class="relative overflow-hidden flex-grow h-96">
        <BaseGradientCover class="rotate-180" />

        <ShowSlideShow
          v-if="getImages('background').length"
          containerClass="h-96"
          imageClass="w-full"
          :images="getImages('background')"
        />
        <p v-else class="text-center text-neutral-400 p-8 m-auto">No images available</p>
      </div>
      <div class="bg-neutral-950 p-8 flex flex-col gap-4">
        <ShowDetails
          v-if="showDetails"
          :showId="showDetails.id"
          :name="showDetails.name"
          :language="showDetails.language"
          :premiered="showDetails.premiered"
          :officialSite="showDetails.officialSite"
          :summary="showDetails.summary"
          :seasons="showDetails.seasons"
          :webChannel="showDetails.webChannel"
          :network="showDetails.network"
        />
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent } from 'vue'
import { useShowDetails } from '@/composables/showDetails'
import IconsX from '@/components/Icons/X.vue'
import BaseGradientCover from '@/components/Base/GradientCover.vue'
import ShowAverageRating from './AverageRating.vue'
import ShowStatusTextIcon from './StatusTextIcon.vue'

const ShowSlideShow = defineAsyncComponent(() => import('@/components/Show/SlideShow.vue'))
const ShowDetails = defineAsyncComponent(() => import('@/components/Show/ShowDetails.vue'))

const { showDetails, getImages, closePopup } = useShowDetails()
</script>
