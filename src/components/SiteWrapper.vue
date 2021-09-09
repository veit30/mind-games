<template>
  <div class="site-wrapper">
    <mind-games-header />
    <hr class="size-wrapper__background-line" />
    <hr class="size-wrapper__background-line" />
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import MindGamesHeader from "@/components/MindGamesHeader.vue";

export default defineComponent({
  name: "SiteWrapper",

  components: {
    MindGamesHeader,
  },
});
</script>

<style lang="scss" scoped>
.site-wrapper {
  background: $c-background-dark;
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: -2;
}

.size-wrapper__background-line {
  width: 100%;
  position: fixed;
  border-top: 1px solid $c-border-dark;
  z-index: -1;

  &:first-of-type {
    top: 40%;
  }

  &:last-of-type {
    top: 75%;
  }
}
</style>
