<!-- arrow left -->

<template>
  <div ref="slider" class="group overflow-hidden">
    <!-- Button Start -->
    <div
      @click="prevSlide"
      v-show="currentIndex > 0"
      class="hidden group-hover:flex group-hover:opacity-50 hover:!opacity-80 transition-all duration-300 ease-in-out w-[70px] h-[300px] bg-white rounded-md absolute z-10 items-center justify-center"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-6 h-6"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5"
        />
      </svg>
    </div>
    <!-- Button end -->
    <!-- Button Start -->
    <div
      @click="nextSlide"
      class="hidden group-hover:flex group-hover:opacity-50 hover:!opacity-80 transition-all duration-300 ease-in-out w-[70px] h-[300px] bg-white rounded-md snap-start shrink-0 absolute z-10 right-0 items-center justify-center"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-6 h-6"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5"
        />
      </svg>
    </div>
    <!-- Button end -->
    <div
      :style="{ transform: `translateX(-${currentIndex * slideWidth}px)` }"
      class="flex gap-4 relative transition-all ease-in-out duration-500"
    >
      <!-- Item Start -->
      <ShowCard size="large" v-for="k in 10" :key="k + '_show'"></ShowCard>
      <!-- Item end -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import ShowCard from '@/components/Show/Card.vue'
// State to track current slide index
const currentIndex = ref(0)

const items = ref([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])

// Assuming 'container' is the container element of your carousel
const slider = ref<HTMLAnchorElement>()
const sliderContainerWidth = ref<number>(0)
const slidesVisible = ref<number>(0)

onMounted(() => {
  sliderContainerWidth.value = slider?.value?.clientWidth ?? 0
  slidesVisible.value = Math.floor(sliderContainerWidth.value / slideWidth)
})

// Width of each slide including padding
const slideWidth = 200 + 16

// Calculate the number of slides that can fit within the available width

// Method to move to the next slide
const nextSlide = () => {
  if (currentIndex.value + slidesVisible.value >= items.value.length) {
    currentIndex.value = 0
    return
  }
  //   currentIndex.value = (currentIndex.value + slidesVisible.value) % items.value.length
  currentIndex.value++
}

// Method to move to the previous slide
const prevSlide = () => {
  currentIndex.value--
}
</script>

<style scoped></style>
