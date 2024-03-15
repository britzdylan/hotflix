<template>
  <div
    v-for="(i, index) in images"
    :class="[{ fixed: fixed }, containerClass, 'z-0  overflow-hidden']"
  >
    <img
      v-show="index == currentIndex"
      :key="index + i"
      :class="['transition-all', { 'scale-up': images.length > 1 }, imageClass]"
      :src="i"
    />
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

interface IProps {
  images: string[]
  fixed?: boolean
  containerClass?: string
  imageClass?: string
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
