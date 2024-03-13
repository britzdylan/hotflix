<template>
  <BasePageViewMobile>
    <div class="absolute top-0 left- right-0 z-0">
      <img
        class="transform scale-100 object-contain object-top"
        src="https://static.tvmaze.com/uploads/images/original_untouched/303/758506.jpg"
      />
    </div>
    <div class="!justify-end bg-opacity-0 inline-flex z-10">
      <IconsX />
    </div>
    <h2 class="text-xl font-semibold">Recommended tv shows</h2>
  </BasePageViewMobile>
</template>

<script setup lang="ts">
import BasePageViewMobile from '@/components/Base/PageView/Mobile.vue'
import HeaderBase from '@/components/Header/Base.vue'
import IconsX from '@/components/Icons/X.vue'
</script>

<style scoped></style>
