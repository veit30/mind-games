<template>
  <div class="game-wrapper">
    <h2 class="game-wrapper__headline">{{ title }}</h2>
    <div class="game-wrapper__container">
      <slot name="top"></slot>
      <div class="game-wrapper__button-container margin-horizontal--large">
        <game-button
          class="game-wrapper__top-button"
          alternative="B"
          @click="this.$router.push('/')"
          >Back</game-button
        >
        <game-button
          class="game-wrapper__top-button"
          alternative="R"
          @click="$emit('restart')"
          >Restart</game-button
        >
      </div>
      <div class="game-wrapper__main-container">
        <slot></slot>
      </div>
      <div class="game-wrapper__down-draw"></div>
      <slot name="middle"></slot>
      <div class="game-wrapper__action-button-container">
        <game-button
          v-for="button in actionButtons"
          :key="button.name"
          class="game-wrapper__action-button"
          :class="[
            button.isFullSize
              ? 'game-wrapper__action-button--full'
              : 'game-wrapper__action-button--default',
            button.hasExtraBorder ? 'border-left--dark' : '',
          ]"
          :is-large="true"
          @click="$emit(button.clickEvent)"
          :alternative="button.alternative"
          :borderless="true"
        >
          {{ button.label }}
        </game-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import GameButton from "@/components/GameButton.vue";
import type { ActionButtonOptions } from "@/data/types";

export default defineComponent({
  name: "GameWrapper",

  components: {
    GameButton,
  },

  data() {
    return {};
  },

  props: {
    actionButtons: {
      type: Object as PropType<Array<ActionButtonOptions>>,
    },
    title: {
      type: String,
    },
  },

  computed: {},

  methods: {},
});
</script>

<style lang="scss" scoped>
.game-wrapper {
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  user-select: none;

  &__headline {
    font-size: 32px;
  }

  &__container {
    border: 1px solid $color-border-dark;
    background: $color-background-dark;
    width: 550px;
    height: 750px;
    margin-top: 30px;
    display: flex;
    flex-direction: column;
  }

  &__button-container {
    display: flex;
    justify-content: space-between;
  }

  &__action-button-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }

  &__top-button {
    min-width: 100px;
  }

  &__main-container {
    margin-top: 100px;
    font-size: 60px;
    text-align: center;

    button {
      margin-top: 55px;
    }
  }

  &__down-draw {
    margin-top: auto;
  }
}

// Overwrite default game button styles
button.game-wrapper__action-button {
  flex-basis: 50%;
  height: 100px;
  border-top: 1px solid $color-border-dark;

  &.border {
    &-left {
      &--dark {
        border-left: 1px solid $color-border-dark;
      }
    }
  }

  &--full {
    flex-basis: 100%;
  }

  &--default {
    flex-basis: 50%;
  }

  &:hover {
    background: $color-background-darker;
    color: $color-font;
    cursor: pointer;
  }
}
</style>
