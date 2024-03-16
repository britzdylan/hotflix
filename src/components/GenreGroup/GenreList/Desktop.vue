<!-- arrow left -->

<template>
  <div ref="slider" class="group overflow-hidden relative">
    <!-- Button Start -->
    <button
      @click="prevSlide"
      v-show="currentIndex > 0"
      class="group group-hover:flex slider-button left-0"
    >
      <IconsChevronDouble />
    </button>
    <!-- Button end -->
    <!-- Button Start -->
    <button @click="nextSlide" class="group group-hover:flex slider-button right-0">
      <IconsChevronDouble class="rotate-180" />
    </button>
    <!-- Button end -->
    <div
      :style="{ transform: `translateX(-${currentIndex * slideWidth}px)` }"
      class="flex gap-4 relative transition-all ease-in-out duration-500"
    >
      <!-- Item Start -->
      <ListingCard
        @click="showPopup(`show_${k.id}`)"
        class="cursor-pointer hover:scale-95 hover:outline outline-2 outline-offset-1 outline-neutral-50 transition-transform duration-300 ease-out"
        v-for="k in shows"
        v-bind="k"
        :key="k + '_show'"
      ></ListingCard>
      <!-- Item end -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import ListingCard from '@/components/Show/ListingCard.vue'
import IconsChevronDouble from '@/components/Icons/ChevronDouble.vue'
import type { IShow } from '@/types'
import { usePopup } from '@/composables/popup'

interface IProps {
  shows: IShow[]
}
const props = defineProps<IProps>()

const { showPopup } = usePopup()

// State to track current slide index
const currentIndex = ref(0)
const slideWidth = 200 + 16

// Assuming 'container' is the container element of your carousel
const slider = ref<HTMLAnchorElement>()
const sliderContainerWidth = ref<number>(0)
const slidesVisible = ref<number>(0)

onMounted(() => {
  sliderContainerWidth.value = slider?.value?.clientWidth ?? 0
  slidesVisible.value = Math.floor(sliderContainerWidth.value / slideWidth)
})

const nextSlide = () => {
  if (currentIndex.value + slidesVisible.value >= props.shows.length) {
    currentIndex.value = 0
    return
  }
  currentIndex.value++
}

// Method to move to the previous slide
const prevSlide = () => {
  currentIndex.value--
}
</script>

<style scoped>
.slider-button {
  @apply hidden  transition-all duration-300 ease-in-out w-[70px] h-[300px] cursor-pointer bg-neutral-950/50 rounded-md snap-start shrink-0 absolute z-10  items-center justify-center;
}
</style>
