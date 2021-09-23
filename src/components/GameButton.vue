<template>
  <button class="game-button" :class="borderClass">
    <span :class="extraClasses"><slot></slot></span>
    <span class="game-button__alternative" :class="extraClasses">{{
      alternative
    }}</span>
  </button>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "GameButton",

  props: {
    alternative: {
      type: String,
    },
    isLarge: {
      type: Boolean,
    },
    borderless: {
      type: Boolean,
    },
  },

  computed: {
    extraClasses() {
      return this.isLarge ? "game-button--large" : "";
    },
    borderClass() {
      return this.borderless ? "game-button--borderless" : "";
    },
  },
});
</script>

<style lang="scss" scoped>
button.game-button {
  background: $color-background-dark;
  outline: none;
  border: 1px solid $color-border-dark;
  padding: 8px 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: $color-font;
  font-family: "Righteous", cursive;
  user-select: none;
  font-size: 20px;
  min-width: 130px;

  &:hover {
    background: $color-background-darker;
    cursor: pointer;
  }

  &--borderless {
    border: none;

    &:hover {
      background: $color-background-dark;
      color: $color-font--hover;
    }
  }
}

.game-button__alternative {
  color: $color-font-dark;
  font-family: "Alegreya Sans", sans-serif;
  font-weight: 900;

  &.game-button--large {
    font-size: 30px;
  }
}

.game-button--large {
  font-size: 34px;
}
</style>
