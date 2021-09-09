<template>
  <button class="game-button" @click="$emit('click')">
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
  },

  computed: {
    extraClasses() {
      return this.isLarge ? "game-button--large" : "";
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
}

.game-button__alternative {
  color: $color-font-dark;
  font-family: 'Alegreya Sans', sans-serif;
  font-weight: 900;

  &.game-button--large {
    font-size: 26px;
  }
}

.game-button--large {
  font-size: 34px;
}
</style>
