<!--
  Default Layout
  Wraps every page in a max-width container with the header and footer.
-->
<template>
  <div class="layout">
    <div class="container">
      <!-- Page content injected here -->
      <slot />
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .layout {
    min-height: 100dvh;
    display: flex;
    flex-direction: column;
  }
</style>
