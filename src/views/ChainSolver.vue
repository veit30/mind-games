<template>
  <div class="chain-solver">
    <game-wrapper
      title="Chain Solver"
      @restart="restart"
      @next="nextStep"
      @commit-solution-1="commitSolution(0)"
      @commit-solution-2="commitSolution(1)"
      :actionButtons="currentActionButtons"
    >
      <template #top>
        <timer-box class="chain-solver__timer" :timer="gameTimer" />
      </template>
      <template #default>
        <game-button
          v-if="isGameOver && isFirstGame"
          class="chain-solver__start-button"
          alternative="S"
          :borderless="true"
          :is-large="true"
          @click="restart"
          >Start Game</game-button
        >
        <p v-else-if="isPreCountdownRunning">
          {{ preGameCountdown.value === 0 ? "" : preGameCountdown.value }}
        </p>
      </template>
      <template #middle>
        <div
          v-if="!isPreCountdownRunning"
          class="chain-solver__steps-container"
        >
          <game-step-indicator
            v-for="step in gameSteps"
            :key="step.name"
            :step="step"
          />
        </div>
        <div
          v-if="!isPreCountdownRunning"
          class="chain-solver__steps-container"
        >
          <game-step-indicator
            v-for="step in gamePhases"
            :key="step.name"
            :step="step"
          />
        </div>
      </template>
    </game-wrapper>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import GameButton from "@/components/GameButton.vue";
import TimerBox from "@/components/TimerBox.vue";
import GameWrapper from "@/components/GameWrapper.vue";
import Timer from "@/data/Timer";
import Countdown from "@/data/Countdown";
import Task from "@/data/Task";
import type { Solution } from "@/data/Task";
import type { ActionButtonOptions, GameStep } from "@/data/types";
import { GAME_STATE } from "@/data/constants";
import GameStepIndicator from "@/components/GameStepIndicator.vue";

const actionButtons: ActionButtonOptions[] = [
  {
    name: "next",
    alternative: "space",
    label: "Weiter",
    clickEvent: "next",
    isFullSize: true,
  },
  {
    name: "solution1",
    alternative: "←",
    label: "",
    clickEvent: "commit-solution-1",
    isFullSize: false,
  },
  {
    name: "solution2",
    alternative: "→",
    label: "",
    clickEvent: "commit-solution-2",
    isFullSize: false,
    hasExtraBorder: true,
  },
];

export default defineComponent({
  name: "ChainSolver",

  components: {
    GameButton,
    TimerBox,
    GameWrapper,
    GameStepIndicator,
  },

  data() {
    return {
      actionButtons,
      isGameOver: true,
      isFirstGame: true,
      gameTimer: new Timer() as Timer,
      preGameTimeout: 0 as number,
      preGameCountdown: new Countdown(3) as Countdown,
      gameSteps: [] as GameStep[],
      gamePhases: [] as GameStep[],
      task: new Task() as Task,
      phase: 0,
    };
  },

  beforeMount() {
    document.addEventListener("keydown", this.handleKeyDown, false);
  },

  beforeUnmount() {
    document.removeEventListener("keydown", this.handleKeyDown, false);
  },

  computed: {
    currentActionButtons(): ActionButtonOptions[] {
      return this.actionButtons;
    },
    isPreCountdownRunning(): boolean {
      return !this.isGameOver && !this.preGameCountdown.isOver;
    },
  },

  methods: {
    resetGamePhases() {
      this.gamePhases = Array.from({ length: 3 }, (x, i) => ({
        state: GAME_STATE.PENDING,
        name: `phase-${i}`,
      }));
    },
    restart() {
      this.isFirstGame = false;
      this.phase = -1;
      this.resetGamePhases();
      this.nextPhase();
      clearInterval(this.preGameTimeout);
      this.gameTimer.stop();
      this.preGameCountdown.reset();
      this.isGameOver = false;
      this.preGameCountdown.start();

      this.preGameTimeout = setTimeout(() => {
        this.gameTimer.start();
      }, 3000);
    },
    nextPhase() {
      this.phase += 1;
      let taskLength = 8 + this.phase * 2;
      this.task.new(taskLength);
      this.gameSteps = Array.from({ length: taskLength }, (x, i) => ({
        state: i === 0 ? GAME_STATE.UNDECIDED : GAME_STATE.PENDING,
        name: `step-${i}`,
      }));
    },
    nextStep() {
      return;
    },
    commitSolution(index: number) {
      return index;
    },
    handleKeyDown(event: KeyboardEvent) {
      switch (event.code) {
        case "KeyB":
          this.$router.push("/");
          break;
        case "Space":
          this.nextStep();
          break;
        case "KeyR":
        case "KeyS":
          this.restart();
          break;
        case "ArrowRight":
          this.commitSolution(1);
          break;
        case "ArrowLeft":
          this.commitSolution(0);
          break;
      }
    },
  },
});
</script>

<style lang="scss" scoped>
.chain-solver {
  &__start-button {
    margin: 0 auto;
  }

  &__timer {
    margin: 40px auto;
  }

  &__steps-container {
    margin-bottom: 20px;
    margin-right: 30px;
    margin-left: 30px;
    display: flex;
    justify-content: center;
  }
}
</style>
