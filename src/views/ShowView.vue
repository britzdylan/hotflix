<template>
  <main class="flex flex-col min-h-screen">
    <header
      class="!justify-end inline-flex z-20 h-[60px] sticky top-0 transition-colors ease-in duration-100 rounded"
    >
      <IconsX @click="router.back" />
    </header>

    <ShowSlideShow :images="images" />

    <section
      ref="showDetailsSection"
      :style="showDetailsSectionPosition"
      class="z-10 fixed bottom-0 bg-neutral-950 border-t border-neutral-800 w-full p-4 rounded-t-3xl transition-all ease-in duration-300 flex flex-col items-start gap-1 h-[100p]"
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
        :name="showData.name"
        :language="showData.language"
        :premiered="showData.premiered"
        :officialSite="showData.officialSite"
        :summary="showData.summary"
      />
    </section>
  </main>
</template>

<script setup lang="ts">
import type { IShowDetailed } from '@/types'
import { ref, computed, onMounted, onBeforeUnmount, onBeforeMount } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useShowsStore } from '@/stores/shows'
import IconsX from '@/components/Icons/X.vue'
import ShowRating from '@/components/Show/Rating.vue'
import ShowStatus from '@/components/Show/Status.vue'
import ShowSlideShow from '@/components/Show/SlideShow.vue'
import ShowDetails from '@/components/Show/ShowDetails.vue'

const { getShowById } = useShowsStore()

const route = useRoute()
const router = useRouter()
const showId = Array.isArray(route.params.id) ? Number(route.params.id[0]) : Number(route.params.id)

const isLoading = ref(true)
const showData = ref<IShowDetailed | null>(null)

const scrollY = ref(0)
const showDetailsSection = ref()
const translateY = ref(0)
const images = ref([
  'https://static.tvmaze.com/uploads/images/original_untouched/0/1.jpg',
  'https://static.tvmaze.com/uploads/images/original_untouched/81/202627.jpg',
  'https://static.tvmaze.com/uploads/images/original_untouched/81/202628.jpg'
])

onBeforeMount(async () => {
  showData.value = await getShowById(showId)
  isLoading.value = false
})

onMounted(async () => {
  scrollY.value = window.scrollY
})

const showDetailsSectionPosition = computed(() => {
  return {
    transform: `translateY(${translateY.value - 40}px)`
  }
})

const toggleShowDetails = () => {
  if (translateY.value === 0)
    translateY.value = showDetailsSection.value.getBoundingClientRect().height
  else translateY.value = 0
}
</script>
