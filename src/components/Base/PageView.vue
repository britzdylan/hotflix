<template>
  <main class="flex flex-col min-h-screen">
    <DesktopShowDetails v-if="showDesktopShowDetails" />

    <slot name="header"></slot>
    <section class="p-4 lg:px-12 2xl:px-0 flex flex-col gap-4 lg:gap-12 flex-grow">
      <slot />
    </section>
    <slot name="footer"></slot>
  </main>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { usePopup } from '@/composables/popup'
import DesktopShowDetails from '@/components/Show/DesktopShowDetails.vue'

const { popup } = usePopup()

const showDesktopShowDetails = computed(() => {
  return popup.value && popup.value.includes('show_') && window.innerWidth > 768
})
</script>
