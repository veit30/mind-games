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
      <div
        v-if="!isGameOver && !isPreCountdownRunning"
        class="game-wrapper__main-container"
      >
        <slot></slot>
      </div>
      <div
        v-if="isGameOver || isPreCountdownRunning"
        class="game-wrapper__game-info-container"
      >
        <game-button
          v-if="isFirstGame && !isPreCountdownRunning"
          class="game-wrapper__start-button"
          alternative="S"
          :is-borderless="true"
          :is-large="true"
          @click="$emit('restart')"
          >Start Game</game-button
        >
        <div
          v-else-if="!isFirstGame && !isPreCountdownRunning"
          class="game-wrapper__game-over-box"
        >
          <p>Game Over</p>
          <p>
            Points: <span :class="pointsClass">{{ points }}</span>
          </p>
        </div>
        <p v-else>
          {{ preCountdown.value === 0 ? "" : preCountdown.value }}
        </p>
      </div>
      <div class="game-wrapper__down-draw"></div>
      <slot v-if="!isPreCountdownRunning" name="middle"></slot>
      <div
        v-if="!isPreCountdownRunning"
        class="game-wrapper__action-button-container"
      >
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
          :is-borderless="true"
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
import Countdown from "@/data/Countdown";

export default defineComponent({
  name: "GameWrapper",

  components: {
    GameButton,
  },

  data() {
    return {
      preCountdown: new Countdown(3) as Countdown,
      preTimer: 0,
    };
  },

  props: {
    actionButtons: {
      type: Array as PropType<ActionButtonOptions[]>,
      default: () => [],
    },
    title: {
      type: String,
      default: "",
    },
    points: {
      type: Number,
      default: 0,
    },
    pointsClass: {
      type: String,
      default: "color--white",
    },
    isGameOver: {
      type: Boolean,
      required: true,
    },
    counter: {
      type: Number,
      required: true,
    },
  },

  computed: {
    isPreCountdownRunning(): boolean {
      return this.preCountdown.isRunning;
    },
    isFirstGame(): boolean {
      return this.counter < 1;
    },
  },

  methods: {},

  watch: {
    counter(newVal, oldVal) {
      console.log(newVal);

      if (newVal > oldVal) {
        this.preCountdown.reset();
        this.preCountdown.start();
      }
    },
    preCountdown: {
      deep: true,
      handler(newVal) {
        if (newVal.isOver) {
          this.$emit("precountdown-over");
        }
      },
    },
  },
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

  &__start-button {
    margin: 0 auto;
  }

  &__game-over-box {
    p {
      margin-bottom: 10px;
      margin-top: 10px;

      &:nth-of-type(2n) {
        font-size: 32px;
      }
    }
  }

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
  }

  &__game-info-container {
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
