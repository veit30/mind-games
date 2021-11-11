<template>
  <div class="theme" :class="themeClass">
    <div class="site-wrapper">
      <mind-games-header v-if="isHome" />
      <hr v-if="!isHome" class="size-wrapper__background-line" />
      <hr v-if="!isHome" class="size-wrapper__background-line" />
      <slot></slot>
    </div>
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
    theme() {
      return this.$store.state.theme;
    },
    themeClass(): string {
      return `theme--${this.theme}`;
    },
  },

  components: {
    MindGamesHeader,
  },
});
</script>

<style lang="scss">
.site-wrapper {
  @include themed() {
    background: t("bg-secondary");
  }

  width: 100%;
  height: 100%;
  position: fixed;
  z-index: -2;
}

.size-wrapper__background-line {
  @include themed() {
    border-top: 1px solid t("border-theme");
  }
  width: 100%;
  position: fixed;
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
