<template>
  <div v-for="(i, index) in images" class="fixed z-0 w-full overflow-hidden">
    <div
      class="absolute top-0 left-0 right-0 bottom-0 z-10 bg-gradient-to-t from-neutral-950"
    ></div>

    <img
      v-show="index == currentIndex"
      :key="index + i"
      styles="styles"
      :class="[
        'object-contain object-top w-full transition-all',
        { 'scale-up': images.length > 1 }
      ]"
      :src="i"
    />
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

interface IProps {
  images: string[]
}

const props = defineProps<IProps>()

const currentIndex = ref(0)
const intervalId = ref(0)

const updateImage = () => {
  if (props.images.length === 1) {
    currentIndex.value = 0
    return
  }
  currentIndex.value = (currentIndex.value + 1) % props.images.length
}

onMounted(() => {
  // if (props.images.length === 0 || props.images.length === 1) return
  intervalId.value = setInterval(() => {
    updateImage()
  }, 6000)
})

onBeforeUnmount(() => {
  clearInterval(intervalId.value)
})
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
