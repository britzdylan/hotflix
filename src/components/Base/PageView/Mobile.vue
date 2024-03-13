<template>
  <main>
    <slot name="header"> </slot>
    <section class="p-4 pb-[85px] flex flex-col gap-4">
      <slot />
    </section>
    <slot name="footer"> </slot>
  </main>
</template>
