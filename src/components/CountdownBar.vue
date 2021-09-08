<template>
  <div class="countdown-bar">
    <div class="countdown-bar__content"></div>
    <p class="countdown-bar__value">{{ countdown }}</p>
    <!-- {{countdown}} -->
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { Prop } from "vue-property-decorator";

export default class CountdownBar extends Vue {
  countdown = 12;
}
</script>

<style lang="scss" scoped>
.countdown-bar {
  border: 1px solid $c-border-dark;
  height: 30px;
  width: 400px;
  z-index: 5;
  color: #fff;

  &__content {
    background: $c-green;
    height: 100%;
    width: 80%;
    z-index: 4;
  }

  &__value {
    margin: 0;
    position: relative;
    top: -24px;
    left: 190px;
    // color: $c-font-darker;
    color: #fff;
  }
}
</style>
