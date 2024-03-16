<template>
  <main class="flex flex-col min-h-screen">
    <header
      class="!justify-end inline-flex z-20 h-[60px] sticky top-0 transition-colors ease-in duration-100 rounded"
    >
      <IconsX @click="router.back" />
    </header>
    <div class="fixed top-0 left-0 right-0 w-full h-full">
      <BaseGradientCover />
      <ShowSlideShow
        imageClass="h-full w-auto object-cover"
        containerClass="bottom-0"
        :images="images"
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

      <div v-if="showData" class="inline-flex items-start w-full justify-between">
        <ShowRating :rating="showData.rating" />
        <ShowStatus :status="showData.ended" />
      </div>

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
    </section>
  </main>
</template>

<script setup lang="ts">
import type { IShowDetailed } from '@/types'
import { ref, computed, onMounted, onBeforeMount } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useShowsStore } from '@/stores/shows'
import IconsX from '@/components/Icons/X.vue'
import ShowRating from '@/components/Show/Rating.vue'
import ShowStatus from '@/components/Show/Status.vue'
import ShowSlideShow from '@/components/Show/SlideShow.vue'
import ShowDetails from '@/components/Show/ShowDetails.vue'
import BaseGradientCover from '@/components/Base/GradientCover.vue'

const { getShowById } = useShowsStore()

const route = useRoute()
const router = useRouter()
const showId = Array.isArray(route.params.id) ? Number(route.params.id[0]) : Number(route.params.id)

const isLoading = ref(true)
const showData = ref<IShowDetailed | null>(null)

const scrollY = ref(0)
const showDetailsSection = ref()
const translateY = ref(0)
const images = computed(
  () => showData.value?.images.filter((i) => i.type === 'poster').map((i) => i.image) || []
)

onBeforeMount(async () => {
  showData.value = await getShowById(showId)
  isLoading.value = false
})

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
