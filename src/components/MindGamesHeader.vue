<template>
  <div class="mind-games-header">
    <div class="header__container" @click="$router.push('/')">
      <h1 class="mind-games-header__headline">{{ headlineValues[0] }}</h1>
      <div class="mind-games-header__headline-separator"></div>
      <h1 class="mind-games-header__headline">{{ headlineValues[1] }}</h1>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { wordVariants } from "@/helpers/helpers";

export default defineComponent({
  name: "MindGamesHeader",

  data() {
    return {
      headlineValues: ["MiNd", "GAmES"] as Array<string>,
    };
  },

  mounted() {
    this.spinHeadline();
  },

  methods: {
    spinHeadline() {
      //TODO: text scrable for headline
    },
  },
});
</script>

<style lang="scss" scoped>
.mind-games-header {
  background: $color-background-darker;
  width: 100%;
  text-align: center;
  color: $color-font;
  padding: 38px 5%;
  user-select: none;
  cursor: pointer;

  &__headline {
    font-family: "Major Mono Display", monospace;
    font-weight: 400;
    font-size: 64px;
    margin: 0;
    display: inline-block;

    &-separator {
      width: 10px;
      display: inline-block;
    }
  }
}
</style>
