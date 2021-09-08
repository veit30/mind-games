<template>
  <div class="game-info-point" :class="colorClass"></div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { Prop } from "vue-property-decorator";

export default class GameInfoPoint extends Vue {
  @Prop({ type: Boolean, default: false }) value!: boolean;
  //implement popover

  get colorClass() {
    return this.value ? "green" : "red";
  }
}
</script>

<style lang="scss" scoped>
.game-info-point {
  width: 8px;
  height: 8px;
  margin: 4px;
  cursor: pointer;

  &.green {
    background: $c-green;
  }

  &.red {
    background: $c-red;
  }
}
</style>
