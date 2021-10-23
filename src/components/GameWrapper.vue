<template>
  <div class="game-wrapper">
    <div class="game-wrapper__headline-container">
      <div class="game-wrapper__headline-side-container"></div>
      <h2
        class="game-wrapper__headline"
        :class="{ 'game-wrapper__headline--long': title.length > 13 }"
      >
        {{ title }}
      </h2>
      <div class="game-wrapper__headline-side-container">
        <button
          class="game-wrapper__help-button"
          :class="{ 'game-wrapper__help-button--small': title.length > 13 }"
          @click="openModal"
        >
          ?
        </button>
        <modal
          v-if="isHelpModalOpen"
          headline="Help"
          :sections="helpModalContent"
          @close="isHelpModalOpen = false"
        >
          <component :is="gameHelperComponent" />
        </modal>
      </div>
    </div>
    <div class="game-wrapper__container">
      <slot name="top"></slot>
      <div v-if="!hasTopSlotContent" class="game-wrapper__top-spacing"></div>
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
        <p
          v-if="instruction"
          class="game-wrapper__instruction"
          v-html="instruction"
        ></p>
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
          <score-view
            v-if="scoreElements.length"
            :game-name="name"
            :score-elements="scoreElements"
          />
          <time-score-view
            v-if="scoreTime"
            :time="scoreTime"
            :game-name="name"
          />
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
          @click="$emit(button.clickEvent.event, button.clickEvent.value)"
          :alternative="button.alternative"
          :is-borderless="true"
          :has-fly-out="button.hasFlyOut ? true : false"
          :label="button.label"
          :action-counter="button.actionCounter"
          :background-color="button.backgroundColor"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, defineAsyncComponent, PropType } from "vue";
import GameButton from "@/components/GameButton.vue";
import type { ActionButtonOptions, ScoreElement } from "@/data/types";
import Countdown from "@/data/Countdown";
import ActionButton from "@/components/ActionButton.vue";
import Modal from "@/components/Modal.vue";
import ScoreView from "@/components/ScoreView.vue";
import TimeScoreView from "@/components/TimeScoreView.vue";

export default defineComponent({
  name: "GameWrapper",

  components: {
    GameButton,
    ActionButton,
    Modal,
    ScoreView,
    TimeScoreView,
  },

  data() {
    return {
      preCountdown: new Countdown(3) as Countdown,
      preTimer: 0,
      isHelpModalOpen: false,
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
    name: {
      type: String,
      default: "",
    },
    isGameOver: {
      type: Boolean,
      required: true,
    },
    counter: {
      type: Number,
      required: true,
    },
    scoreElements: {
      type: Array as PropType<ScoreElement[]>,
      default: () => [],
    },
    instruction: {
      type: String,
      default: "",
    },
    scoreTime: {
      type: Number,
      default: 0,
    },
    hasNoPreCountdown: {
      type: Boolean,
      default: false,
    },
  },

  beforeMount() {
    document.addEventListener("keydown", this.handleKeyDown, false);
  },

  beforeUnmount() {
    document.removeEventListener("keydown", this.handleKeyDown, false);
  },

  computed: {
    gameHelperComponent() {
      return defineAsyncComponent(
        () => import(`@/components/gameHelp/${this.name}Help.vue`)
      );
    },
    isPreCountdownRunning(): boolean {
      return this.preCountdown.isRunning;
    },
    isFirstGame(): boolean {
      return this.counter < 1;
    },
    hasTopSlotContent(): boolean {
      return !!this.$slots["top"];
    },
  },

  methods: {
    handleKeyDown(event: KeyboardEvent) {
      switch (event.code) {
        case "KeyB":
          event.preventDefault();
          this.$router.push("/");
          break;
        case "KeyR":
        case "KeyS":
          event.preventDefault();
          this.$emit("restart");
          break;
      }
      this.actionButtons.forEach((button) => {
        if (button.code && button.code === event.code) {
          event.preventDefault();
          this.$emit(button.clickEvent.event, button.clickEvent.value);
        }
      });
    },
    openModal() {
      this.isHelpModalOpen = true;
    },
  },

  watch: {
    counter(newVal, oldVal) {
      if (newVal > oldVal && !this.hasNoPreCountdown) {
        this.preCountdown.reset();
        this.preCountdown.start();
      } else {
        this.$emit("precountdown-over");
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

  &__top-spacing {
    height: 4rem;
  }

  &__instruction {
    text-align: center;
    margin-top: 2.5rem;
    margin-bottom: 2rem;
    font-size: 1.5rem;
  }

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

    &--long {
      font-size: 1.5rem;
      padding: 1rem 0;
    }
  }

  &__headline-container {
    text-align: center;
    border: 1px solid $color-border-dark;
    width: 90%;
    display: flex;
    justify-content: space-between;
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

  &__game-info-container {
    margin-top: 6rem;
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

  &__help-button {
    margin-right: 1rem;
    padding: 0;
    font-size: 2rem;
    font-family: $font-title;
    background: $color-background-dark;
    outline: none;
    border: none;
    color: $white;
    cursor: pointer;
    float: right;

    &--small {
      font-size: 1.5rem;
    }

    &:hover {
      color: $grey-80;
    }
  }

  &__headline-side-container {
    width: 10%;
  }
}

/* MEDIA QUERY */

@media only screen and (min-width: 500px) {
  .game-wrapper {
    &__container {
      height: calc(100vh - 9rem);
    }
  }
}

@media only screen and (min-width: 900px) {
  .game-wrapper {
    &__container {
      width: 50%;
    }

    &__headline-container {
      width: 50%;
    }

    &__game-info-container {
      margin-top: 4rem;

      button {
        margin-top: 0.5rem;
      }
    }

    &__button-container {
      margin-left: 5rem;
      margin-right: 5rem;
    }

    &__headline--long {
      font-size: 2rem;
      padding: 1rem 0;
    }

    &__help-button {
      margin-right: 1.5rem;

      &--small {
        font-size: 2rem;
      }
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
