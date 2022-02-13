<template>
  <button class="game-button" :class="extraClasses">
    <span><slot></slot></span>
    <span
      v-if="alternative.length && isUserOnDesktop"
      class="game-button__alternative"
      :class="{ noitalic: alternative === '↓' || alternative === '↑' }"
      >{{ alternative }}</span
    >
  </button>
</template>

<script lang="ts">
import { deviceType } from "@/helper/util";
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
    isUserOnDesktop() {
      return deviceType() === "desktop";
    },
  },
});
</script>

<style lang="scss" scoped>
button.game-button {
  @include themed() {
    background: t("bg");
    border: 1px solid t("border");
    color: t("text");
  }
  // background: $color-background-dark;
  // border: 1px solid $color-border-dark;
  // color: $color-font;
  outline: none;
  padding: 0.5rem 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: $font-main;
  font-weight: 500;
  user-select: none;
  font-size: 1.25rem;
  min-width: 9rem;

  &:hover {
    @include themed() {
      background: t("bg-secondary");
    }
    // background: $color-background-darker;
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
    @include themed() {
      border: none;
    }

    &:hover {
      @include themed() {
        background: t("bg");
        color: t("text-hover");
      }
      // background: $color-background-dark;
      // color: $color-font--hover;
    }
  }
}

.game-button__alternative {
  @include themed() {
    color: t("text-secondary");
  }
  // color: $color-font-dark;
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
      @include themed() {
        background: t("bg-secondary");
        color: t("text");
      }
      // background: $color-background-darker;
      // color: $color-font;
    }
  }
}
</style>
