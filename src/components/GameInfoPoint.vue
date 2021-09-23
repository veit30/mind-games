<template>
  <div class="game-info-point" :class="colorClass">
    <div class="game-info-point__popover"><slot></slot></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "GameInfoPoint",

  data() {
    return {
      isOpen: false,
    };
  },

  props: {
    value: {
      type: Boolean,
      default: false,
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
  position: relative;
  cursor: pointer;

  &.green {
    background: $green;
  }

  &.red {
    background: $red;
  }

  &:hover {
    .game-info-point__popover {
      display: block;
    }
  }

  &__popover {
    display: none;
    background: $color-background-darker;
    color: #fff;
    font-size: 14px;
    font-family: "Righteous", cursive;
    padding: 20px 20px;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    white-space: nowrap;
    bottom: 20px;
    z-index: 4;

    &:before {
      border-top: 7px solid $color-border-darker;
      border-right: 7px solid transparent;
      border-left: 7px solid transparent;
      bottom: -7px;
      content: "";
      display: block;
      left: 50%;
      margin-left: -7px;
      position: absolute;
    }
  }
}
</style>
