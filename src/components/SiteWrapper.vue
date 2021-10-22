<template>
  <div class="site-wrapper">
    <mind-games-header v-if="isHome" />
    <hr v-if="!isHome" class="size-wrapper__background-line" />
    <hr v-if="!isHome" class="size-wrapper__background-line" />
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import MindGamesHeader from "@/components/MindGamesHeader.vue";

export default defineComponent({
  name: "SiteWrapper",

  computed: {
    isHome() {
      return this.$route.name === "Home";
    },
  },

  components: {
    MindGamesHeader,
  },
});
</script>

<style lang="scss" scoped>
.site-wrapper {
  background: $color-background-dark;
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: -2;
}

.size-wrapper__background-line {
  width: 100%;
  position: fixed;
  border-top: 1px solid $color-border-dark;
  z-index: -1;

  &:first-of-type {
    top: 20%;
  }

  &:last-of-type {
    top: 65%;
  }
}

@media only screen and (min-width: 500px) {
  .size-wrapper__background-line {
    &:first-of-type {
      top: 28%;
    }

    &:last-of-type {
      top: 72%;
    }
  }
}
</style>
