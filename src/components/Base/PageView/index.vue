<template>
  <main class="flex flex-col min-h-screen">
    <slot name="header"></slot>
    <section class="p-4 flex flex-col gap-4 flex-grow">
      <slot />
    </section>
    <slot name="footer"></slot>
  </main>
</template>
