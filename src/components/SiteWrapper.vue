<template>
  <div class="site-wrapper">
    <mind-games-header />
    <hr
      v-for="line in backgroundLines"
      :key="line.style"
      :style="line.style"
      class="size-wrapper__background-line"
    />
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import MindGamesHeader from "@/components/MindGamesHeader.vue";
import backgroundData from "@/data/backgroundData";
// TODO: use state for that
import games from "@/data/games";

export default defineComponent({
  name: "SiteWrapper",

  data() {
    return {
      backgroundData,
      games,
    };
  },

  computed: {
    //TODO: remove in future when not needed
    backgroundLines(): Array<{ style: string }> {
      switch (this.$route.name) {
        default:
          return backgroundData["game"];
      }
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
    top: 40%;
  }

  &:last-of-type {
    top: 75%;
  }
}
</style>
