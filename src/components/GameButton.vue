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
  background: $c-background-dark;
  outline: none;
  border: 1px solid $c-border-dark;
  padding: 8px 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: $c-font;
  font-family: "Righteous", cursive;
  user-select: none;
  font-size: 20px;
  min-width: 130px;

  &:hover {
    background: $c-background-darker;
    cursor: pointer;
  }
}

.game-button__alternative {
  color: $c-font-dark;
  font-family: "Archivo Black", sans-serif;

  &.game-button--large {
    font-size: 26px;
  }
}

.game-button--large {
  font-size: 34px;
}
</style>
