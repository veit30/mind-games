<template>
  <button class="game-button" :class="extraClasses">
    <span><slot></slot></span>
    <span v-if="alternative.length" class="game-button__alternative">{{
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
      default: "",
    },
    isLarge: {
      type: Boolean,
    },
    isBorderless: {
      type: Boolean,
    },
  },

  computed: {
    extraClasses() {
      return {
        "game-button--large": this.isLarge && this.alternative.length <= 2,
        "game-button--large-small-alt":
          this.isLarge && this.alternative.length > 2,
        "game-button--borderless": this.isBorderless,
      };
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

  &--large {
    font-size: 34px;

    .game-button__alternative {
      font-size: 30px;
    }
  }

  &--large-small-alt {
    font-size: 34px;

    .game-button__alternative {
      font-size: 20px;
    }
  }
}

.game-button__alternative {
  color: $color-font-dark;
  font-family: "Alegreya Sans", sans-serif;
  font-weight: 900;
}
</style>
