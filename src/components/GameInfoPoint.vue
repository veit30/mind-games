<template>
  <div class="game-info-point" :class="colorClass">
    <div class="game-info-point__popover">{{ infoText }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "GameInfoPoint",

  props: {
    value: {
      type: Boolean,
      default: false,
    },
    infoText: {
      type: String,
      default: "",
    },
  },

  computed: {
    colorClass() {
      return this.value ? "green" : "red";
    },
  },
});
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
