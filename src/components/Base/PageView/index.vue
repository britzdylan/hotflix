<template>
  <main class="flex flex-col min-h-screen">
    <slot name="header"></slot>
    <section class="p-4 lg:px-12 2xl:px-0 flex flex-col gap-4 lg:gap-12 flex-grow">
      <slot />
    </section>
    <slot name="footer"></slot>
  </main>
</template>
