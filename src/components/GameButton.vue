<template>
  <button class="game-button" :class="extraClasses">
    <span><slot></slot></span>
    <span
      v-if="alternative.length"
      class="game-button__alternative"
      :class="{ noitalic: alternative === '↓' || alternative === '↑' }"
      >{{ alternative }}</span
    >
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
  padding: 0.5rem 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: $color-font;
  font-family: $font-main;
  font-weight: 500;
  user-select: none;
  font-size: 1.25rem;
  min-width: 9rem;

  &:hover {
    background: $color-background-darker;
    cursor: pointer;
  }

  &--large {
    font-size: 2rem;

    .game-button__alternative {
      font-size: 1.75rem;
    }
  }

  &--large-small-alt {
    font-size: 2rem;

    .game-button__alternative {
      font-size: 1.25rem;
    }
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
  font-family: $font-secondary;
  font-style: italic;
  font-weight: 900;

  &.noitalic {
    font-style: normal;
  }
}

.action-button:hover {
  button.game-button {
    &--borderless {
      background: $color-background-darker;
      color: $color-font;
    }
  }
}
</style>
