<template>
  <main class="flex flex-col min-h-screen">
    <header
      :style="headerOpacity"
      class="!justify-end inline-flex z-20 h-[60px] sticky top-0 transition-colors ease-in duration-100 rounded"
    >
      <IconsX />
    </header>
    <div :style="imageScale" class="fixed z-0 -mt-[60px] w-full overflow-hidden">
      <div
        class="absolute top-0 left-0 right-0 bottom-0 z-10 bg-gradient-to-t from-neutral-950"
      ></div>
      <img
        class="object-cover object-top w-full"
        src="https://static.tvmaze.com/uploads/images/original_untouched/81/202635.jpg"
      />
    </div>

    <section
      class="z-10 bg-neutral-950 border-t border-neutral-800 w-full p-4 mt-[calc(60vh)] flex-grow rounded-t-3xl transition-all ease-in duration-300"
    >
      <h2 class="text-xl font-semibold">Recommended tv shows</h2>
    </section>
  </main>
</template>

<script setup lang="ts">
import IconsX from '@/components/Icons/X.vue'

import { ref, computed, onMounted } from 'vue'

const scrollY = ref(0)

onMounted(() => {
  scrollY.value = window.scrollY

  window.addEventListener('scroll', () => {
    scrollY.value = window.scrollY
  })
})

const headerOpacity = computed(() => {
  return {
    backgroundColor: `rgba(10, 10, 10, ${scrollY.value / 300})`,
    borderBottom: `1px solid rgba(38, 38, 38, ${scrollY.value / 300})`
  }
})
// #262626

const imageScale = computed(() => {
  return {
    transform: `scale(${1 + scrollY.value / 10000})`,
    opacity: `${1 - scrollY.value / 1000}`
  }
})
</script>

<style scoped></style>
