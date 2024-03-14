<template>
  <main class="flex flex-col min-h-screen">
    <header
      class="!justify-end inline-flex z-20 h-[60px] sticky top-0 transition-colors ease-in duration-100 rounded"
    >
      <IconsX />
    </header>

    <div v-for="(i, index) in images" class="fixed z-0 -mt-[60px] h-full overflow-hidden">
      <div
        class="absolute top-0 left-0 right-0 bottom-0 z-10 bg-gradient-to-t from-neutral-950"
      ></div>

      <img
        v-show="index == currentIndex"
        :key="index + i"
        styles="styles"
        class="object-cover object-top h-full transition-all scale-up"
        :src="i"
      />
    </div>

    <section
      ref="section"
      :style="sectionPosition"
      class="z-10 fixed bottom-0 bg-neutral-950 border-t border-neutral-800 w-full p-4 rounded-t-3xl transition-all ease-in duration-300 flex flex-col items-start gap-1 h-[100p]"
    >
      <div @click="showInfo" class="w-full h-max">
        <span class="w-20 h-1 bg-neutral-800 rounded-full block mx-auto mb-4"></span>
      </div>
      <!--  Rating -->
      <div class="inline-flex items-start w-full justify-between">
        <div class="inline-flex items-start">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="w-5 h-5 text-primary-500"
          >
            <path
              fill-rule="evenodd"
              d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
              clip-rule="evenodd"
            />
          </svg>

          <span class="text-2xl font-semibold ml-1 leading-6">7.8</span>
          <span class="text-sm text-neutral-300 leading-4">/10</span>
        </div>
        <div class="inline-flex items-center gap-2">
          <div class="h-2 w-2 bg-green-500 shadow-green-400 rounded-full"></div>
          <span class="text-sm">Running</span>
        </div>
      </div>
      <h2 class="text-lg font-semibold">Under the dome</h2>
      <div class="flex gap-2 my-1">
        <span class="text-sm text-neutral-300">English</span>
        <span class="text-sm text-neutral-300">2013</span>
        <span class="text-sm text-neutral-300">CBS</span>
        <span class="text-sm text-neutral-200">3 seasons</span>
      </div>
      <button
        class="mb-3 w-full h-[40px] p-4 flex items-center justify-center text-sm font-semibold bg-white rounded-md text-black"
      >
        Official Site
      </button>
      <button
        class="mb-3 w-full h-[40px] p-4 flex items-center justify-center text-sm font-semibold bg-transparent border border-white rounded-md"
      >
        Add to Watchlist
      </button>
      <p class="text-sm text-neutral-200">
        An invisible and mysterious force field descends upon a small actual town of Chester's Mill,
        Maine, USA, trapping residents inside, cut off from the rest of civilization. The trapped
        townspeople must discover the secrets and purpose of the "dome" or "sphere" and its origins,
        while coming to learn more than they ever knew about each other and animals too.
      </p>
    </section>
  </main>
</template>

<script setup lang="ts">
import IconsX from '@/components/Icons/X.vue'

import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

const scrollY = ref(0)
const section = ref()
const translateY = ref(0)
const images = ref([
  'https://static.tvmaze.com/uploads/images/original_untouched/0/1.jpg',
  'https://static.tvmaze.com/uploads/images/original_untouched/81/202627.jpg',
  'https://static.tvmaze.com/uploads/images/original_untouched/81/202628.jpg'
])
let currentIndex = ref(0)

onMounted(() => {
  setInterval(() => {
    updateImage()
  }, 6000) // Change image every 4 seconds
  scrollY.value = window.scrollY
  translateY.value = section.value.getBoundingClientRect().height
  window.addEventListener('scroll', () => {
    scrollY.value = window.scrollY
  })
})

const sectionPosition = computed(() => {
  return {
    transform: `translateY(${translateY.value - 40}px)`
  }
})

const showInfo = () => {
  if (translateY.value === 0) translateY.value = section.value.getBoundingClientRect().height
  else translateY.value = 0
}

const updateImage = () => {
  currentIndex.value = (currentIndex.value + 1) % images.value.length
}
</script>

<style scoped>
.scale-up {
  animation: scaleUp 6s ease-in both;
}

@keyframes scaleUp {
  0% {
    transform: scale(1.05);
    opacity: 0;
  }
  30% {
    opacity: 0.5;
  }
  50% {
    opacity: 1;
  }
  98% {
    opacity: 0;
  }
  100% {
    transform: scale(1); /* Adjust scale and translateY as needed */
    opacity: 0;
  }
}
</style>
