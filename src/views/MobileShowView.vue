<template>
  <main class="flex flex-col min-h-screen">
    <header class="!justify-end inline-flex z-20">
      <IconsX @click="router.back" />
    </header>
    <div class="fixed top-0 left-0 right-0 w-full h-full">
      <BaseGradientCover />
      <ShowSlideShow
        imageClass="h-full w-auto object-cover"
        containerClass="bottom-0"
        :images="getImages('poster')"
      />
    </div>

    <section
      ref="showDetailsSection"
      :style="showDetailsSectionPosition"
      class="z-10 absolute bottom-0 bg-neutral-950 border-t border-neutral-800 w-full p-4 rounded-t-3xl transition-all ease-in duration-300 flex flex-col items-start gap-1"
    >
      <div @click="toggleShowDetails" class="w-full h-max">
        <span class="w-20 h-1 bg-neutral-800 rounded-full block mx-auto mb-4"></span>
      </div>

      <div v-if="showDetails" class="inline-flex items-start w-full justify-between">
        <ShowAverageRating :rating="showDetails.rating" />
        <ShowStatusTextIcon :status="showDetails.ended" />
      </div>

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
    </section>
  </main>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, defineAsyncComponent } from 'vue'
import { useRouter } from 'vue-router'
import { useShowDetails } from '@/composables/showDetails'

import IconsX from '@/components/Icons/X.vue'
import ShowAverageRating from '@/components/Show/AverageRating.vue'
import ShowStatusTextIcon from '@/components/Show/StatusTextIcon.vue'
import BaseGradientCover from '@/components/Base/GradientCover.vue'

const ShowSlideShow = defineAsyncComponent(() => import('@/components/Show/SlideShow.vue'))
const ShowDetails = defineAsyncComponent(() => import('@/components/Show/ShowDetails.vue'))

const router = useRouter()
const { showDetails, getImages } = useShowDetails()

const scrollY = ref(0)
const showDetailsSection = ref()
const translateY = ref(0)

onMounted(async () => {
  scrollY.value = window.scrollY
})

const showDetailsSectionPosition = computed(() => {
  return {
    transform: `translateY(${translateY.value}px)`
  }
})

const toggleShowDetails = () => {
  if (translateY.value === 0)
    translateY.value = showDetailsSection.value.getBoundingClientRect().height - 40
  else translateY.value = 0
}
</script>
