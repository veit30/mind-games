<template>
  <div class="game-wrapper">
    <div class="game-wrapper__headline-container">
      <div class="game-wrapper__headline-side-container">
        <icon-button
          icon="chevron-left"
          class="m1-left"
          :hover-action="'slide-left'"
          @click="routeToHome()"
        />
      </div>
      <h2
        class="game-wrapper__headline"
        :class="{ 'game-wrapper__headline--long': title.length > 13 }"
      >
        {{ title }}
      </h2>
      <div class="game-wrapper__headline-side-container right">
        <icon-button
          v-if="counter"
          icon="restart"
          :size="1.8"
          class="m1-right"
          @click="$emit('restart')"
          :hover-action="'rotate-in'"
        />
        <icon-button icon="help" class="m1-right" @click="openModal" />
        <game-help-modal
          v-if="isHelpModalOpen"
          @close="isHelpModalOpen = false"
        />
      </div>
    </div>
    <div class="game-wrapper__container">
      <slot name="top"></slot>
      <div v-if="!hasTopSlotContent" class="game-wrapper__top-spacing"></div>
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
        <play-button
          v-if="isFirstGame && !isPreCountdownRunning"
          icon="play"
          :size="4"
          @click="$emit('restart')"
        />
        <div
          v-else-if="!isFirstGame && !isPreCountdownRunning"
          class="game-wrapper__game-over-box"
        >
          <p class="game-over">Game Over</p>
          <score-view
            class="game-over__score"
            v-if="scoreElements.length"
            :game-name="name"
            :score-elements="scoreElements"
          />
          <time-score-view
            class="game-over__score"
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
            buttonSizeClass(button),
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
import type { ActionButtonOptions, ScoreElement } from "@/data/types";
import Countdown from "@/data/Countdown";
import ActionButton from "@/components/ActionButton.vue";
import ScoreView from "@/components/ScoreView.vue";
import TimeScoreView from "@/components/TimeScoreView.vue";
import { deviceType } from "@/helper/util";
import GameHelpModal from "@/components/GameHelpModal.vue";
import IconButton from "@/components/IconButton.vue";
import PlayButton from "@/components/PlayButton.vue";

export default defineComponent({
  name: "GameWrapper",

  components: {
    ActionButton,
    ScoreView,
    TimeScoreView,
    GameHelpModal,
    IconButton,
    PlayButton,
  },

  data() {
    return {
      preCountdown: new Countdown(3) as Countdown,
      preTimer: 0,
      isHelpModalOpen: false,
      showGameOver: false,
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

  mounted() {
    this.$store.commit("setGame", this.name);
    this.$store.dispatch("getHighscore", { name: this.name });
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
    isMobile(): boolean {
      return deviceType() !== "desktop";
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
        if (
          button.code &&
          (button.code === event.code || button.altCode === event.code)
        ) {
          event.preventDefault();
          this.$emit(button.clickEvent.event, button.clickEvent.value);
        }
      });
    },
    openModal() {
      this.isHelpModalOpen = true;
    },
    buttonSizeClass(button: ActionButtonOptions) {
      return `game-wrapper__action-button--${button.buttonSize}`;
    },
    routeToHome() {
      this.$store.commit("transitionName", "game-to-home");
      setTimeout(() => {
        this.$router.push("/");
      }, 1100);
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
  @include themed() {
    color: t("text");
  }
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
    display: flex;
    flex-direction: column;
    align-items: center;
    p {
      text-align: center;
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
    @include themed() {
      background: t("bg");
      border: 1px solid t("border-theme");
    }
    position: relative;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.05), 0 3px 6px rgba(0, 0, 0, 0.1);
    text-align: center;
    width: 90%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__container {
    @include themed() {
      background: t("bg");
      border: 1px solid t("border-theme");
      border-top: 0px;
    }
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.05), 0 3px 6px rgba(0, 0, 0, 0.1);
    width: 90%;
    height: calc(100vh - 17.5rem);
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }

  &__button-container {
    display: flex;
    justify-content: flex-end;
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

    &.mobile {
      padding: 1.5rem;
    }
  }

  &__game-info-container {
    margin-top: 6rem;
    font-size: 3.75rem;
    display: flex;
    justify-content: center;

    button {
      margin-top: 3.5rem;
    }
  }

  &__down-draw {
    margin-top: auto;
  }

  &__pregame-countdown {
    margin-top: 5vh;
    animation: growAndShrink 1s ease-in-out infinite;
  }

  &__help-button {
    @include themed() {
      color: t("text");
    }
    background: none;
    margin-right: 1rem;
    padding: 0;
    font-size: 2rem;
    font-family: $font-title;
    outline: none;
    border: none;
    cursor: pointer;
    float: right;

    &--small {
      font-size: 1.5rem;
    }

    &:hover {
      @include themed() {
        color: t("text-hover");
      }
    }
  }

  &__headline-side-container {
    width: 10%;
    display: flex;

    &.right {
      justify-content: flex-end;
    }
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
  @include themed() {
    border-top: 1px solid t("border");
  }
  flex-basis: 50%;
  height: 6.25rem;
  display: flex;
  flex-direction: column;
  justify-content: center;

  button.border {
    &-left {
      &--dark {
        @include themed() {
          border-left: 1px solid t("border");
        }
      }
    }
  }

  &--full {
    flex-basis: 100%;
  }

  &--half {
    flex-basis: 50%;
  }

  &--third {
    flex-basis: calc(100% / 3);
  }

  &:hover {
    @include themed() {
      background: t("bg-secondary");
      color: t("text");
    }
    cursor: pointer;
  }
}

.game-over {
  opacity: 0;
  -webkit-transform: translate3d(0, -2rem, 0);
  transform: translate3d(0, -2rem, 0);
  animation: showAndFadeOut ease 2s 1;

  &__score {
    // animation: fadeInUp ease 2s 1
    opacity: 1;
    -webkit-transform: translate3d(0, -2rem, 0);
    transform: translate3d(0, -2rem, 0);
    animation: fadeInUp ease 3s 1;
  }
}

@keyframes showAndFadeOut {
  0% {
    opacity: 0;
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
  20% {
    opacity: 1;
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
  50% {
    opacity: 1;
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
  100% {
    opacity: 0;
    -webkit-transform: translate3d(0, -2rem, 0);
    transform: translate3d(0, -2rem, 0);
  }
}

@keyframes fadeInUp {
  0% {
    opacity: 0;
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
  30% {
    opacity: 0;
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
  100% {
    opacity: 1;
    -webkit-transform: translate3d(0, -2rem, 0);
    transform: translate3d(0, -2rem, 0);
  }
}
</style>
