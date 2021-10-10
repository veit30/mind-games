<template>
  <div class="game-wrapper">
    <div class="game-wrapper__headline-container">
      <h2 class="game-wrapper__headline">{{ title }}</h2>
    </div>
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
        <p v-else class="game-wrapper__pregame-countdown">
          {{ preCountdown.value === 0 ? "" : preCountdown.value }}
        </p>
      </div>
      <div class="game-wrapper__down-draw"></div>
      <slot v-if="!isPreCountdownRunning" name="bottom"></slot>
      <div
        v-if="!isPreCountdownRunning && !isGameOver"
        class="game-wrapper__action-button-container"
      >
        <action-button
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
          :has-fly-out="button.hasFlyOut ? true : false"
          :label="button.label"
          :fly-out-trigger="button.flyOutTrigger"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import GameButton from "@/components/GameButton.vue";
import type { ActionButtonOptions } from "@/data/types";
import Countdown from "@/data/Countdown";
import ActionButton from "@/components/ActionButton.vue";

export default defineComponent({
  name: "GameWrapper",

  components: {
    GameButton,
    ActionButton,
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
  margin-top: 2rem;
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
      margin-bottom: 0.625rem;
      margin-top: 0.625rem;

      &:nth-of-type(2n) {
        font-size: 2rem;
      }
    }
  }

  &__headline {
    font-size: 2rem;
    padding: 1rem 0;
  }

  &__headline-container {
    text-align: center;
    border: 1px solid $color-border-dark;
    width: 90%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: $color-background-dark;
  }

  &__container {
    border: 1px solid $color-border-dark;
    border-top: 0px;
    background: $color-background-dark;
    width: 90%;
    height: calc(100vh - 17.5rem);
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }

  &__button-container {
    display: flex;
    justify-content: space-between;
    margin-left: 3rem;
    margin-right: 3rem;
  }

  &__action-button-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }

  &__top-button {
    min-width: 6.25rem;
  }

  &__main-container {
    margin-top: 10vh;
    font-size: 3.75rem;
    text-align: center;
  }

  &__game-info-container {
    margin-top: 10vh;
    font-size: 3.75rem;
    text-align: center;

    button {
      margin-top: 3.5rem;
    }
  }

  &__down-draw {
    margin-top: auto;
  }

  &__pregame-countdown {
    margin-top: 5vh;
  }
}

/* MEDIA QUERY */

@media only screen and (min-width: 900px) {
  .game-wrapper {
    &__container {
      width: 50%;
    }

    &__headline-container {
      width: 50%;
    }

    &__main-container {
      // margin-top: 1rem;
      // margin-bottom: 1rem;
      margin-top: 10vh;
      margin-bottom: 10vh;
    }

    &__game-info-container {
      margin-top: 6rem;

      button {
        margin-top: 0.5rem;
      }
    }

    &__button-container {
      margin-left: 5rem;
      margin-right: 5rem;
    }
  }
}

// Overwrite default game button styles
.game-wrapper__action-button {
  flex-basis: 50%;
  height: 6.25rem;
  border-top: 1px solid $color-border-dark;
  display: flex;
  flex-direction: column;
  justify-content: center;

  button.border {
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
