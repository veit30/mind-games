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

export default defineComponent({
  name: "MindGamesHeader",

  data() {
    return {
      headlineValues: ["MiNd", "GAmES"] as Array<string>,
    };
  },

  methods: {
    //TODO: text scrable for headline
  },
});
</script>

<style lang="scss" scoped>
.mind-games-header {
  background: $color-background-darker;
  width: 100%;
  text-align: center;
  color: $color-font;
  padding: 2.375rem 0;
  user-select: none;
  display: flex;
  justify-content: center;

  &__headline {
    font-family: $font-title;
    font-weight: 400;
    font-size: 3.3rem;
    margin: 0;
    display: inline-block;

    &-separator {
      width: 10px;
      display: inline-block;
    }
  }
}

.header__container {
  cursor: pointer;
}
</style>
