<template>
  <div class="flex gap-4 snap-proximity snap-x overflow-x-auto no-scrollbar">
    <div
      v-for="k in 10"
      :key="k + '_show'"
      class="w-[200px] h-[300px] bg-slate-200 rounded-md snap-start lg:snap-end shrink-0"
    ></div>
  </div>
</template>

<script setup lang="ts"></script>
