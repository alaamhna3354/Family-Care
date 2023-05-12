<template>
  <div>
    <ElementsLoader :duration="1000" />
    <ClientOnly>
      <SharedNavbar />
      <slot />
      <SharedFooter />
    </ClientOnly>
  </div>
</template>

<script setup></script>

<style></style>