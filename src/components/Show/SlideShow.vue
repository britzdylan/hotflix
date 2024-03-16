<template>
  <div
    v-for="(i, index) in images"
    :key="index + i"
    :class="['z-0 overflow-hidden absolute top-0 left-0 right-0', containerClass]"
  >
    <img
      v-show="index == currentIndex"
      :class="['transition-all', { 'scale-up': images.length > 1 }, imageClass]"
      :src="i"
    />
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

interface IProps {
  images: string[]
  containerClass?: string
  imageClass?: string
}

const props = defineProps<IProps>()

const currentIndex = ref(0)
const intervalId = ref(0)

const updateImage = () => {
  if (props.images.length === 1) {
    currentIndex.value = 0
    window.clearInterval(intervalId.value)

    return
  }
  currentIndex.value = (currentIndex.value + 1) % props.images.length
}

onMounted(() => {
  intervalId.value = window.setInterval(() => {
    updateImage()
  }, 6000)
})

onBeforeUnmount(() => {
  window.clearInterval(intervalId.value)
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
