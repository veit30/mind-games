<template>
  <div class="mind-games-header">
    <div class="header__container" @click="$router.push('/')">
      <h1 class="mind-games-header__headline">MiNd</h1>
      <div class="mind-games-header__headline-separator"></div>
      <h1 class="mind-games-header__headline">GAmES</h1>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { Prop } from "vue-property-decorator";

export default class MindGamesHeader extends Vue {}
</script>

<style lang="scss" scoped>
.mind-games-header {
  background: $c-background-darker;
  width: 100%;
  text-align: center;
  color: $c-font;
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
