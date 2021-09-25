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
        <timer-box
          class="chain-solver__timer"
          :timer="gameTimer"
          :threshold="gameTimeThreshold"
        />
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
        <div
          v-else-if="isGameOver && !isFirstGame"
          class="chain-solver__game-over-box"
        >
          <p>Game Over</p>
          <p>
            Points: <span :class="pointsClass">{{ gamePoints }}</span>
          </p>
        </div>
        <p v-else-if="isPreCountdownRunning">
          {{ preGameCountdown.value === 0 ? "" : preGameCountdown.value }}
        </p>
        <p v-else>{{ isFinalStep ? "=" : task.taskSteps[stepIndex] }}</p>
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
      gamePhases: [] as GameStep[],
      gameSteps: [] as GameStep[],
      gameTimer: new Timer() as Timer,
      gameTimeThreshold: 115,
      isFirstGame: true,
      isGameOver: true,
      lastSolutionCorrect: false,
      phaseIndex: 0,
      preGameCountdown: new Countdown(3) as Countdown,
      preGameTimeout: 0 as number,
      solutions: [] as Array<Solution>,
      stepIndex: 0,
      task: new Task(8, true, 10) as Task,
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
      if (this.isPreCountdownRunning || this.isGameOver) return [];
      if (!this.isFinalStep) {
        return this.actionButtons.slice(0, 1);
      }
      return this.actionButtons.slice(-2);
    },

    gamePoints(): number {
      let points = 0;
      this.gamePhases.forEach((phase) => {
        points += phase.state === GAME_STATE.DONE ? 1 : 0;
      });

      if (points > 6) {
        let r = this.gameTimer.seconds - 65;
        r = r < 0 ? 0 : r;
        let f = Math.ceil(r / 10);
        f = f > 5 ? 0 : f;
        let timerPoints = 5 - f;
        points += timerPoints;
      }
      return points;
    },

    isFinalStep(): boolean {
      return this.stepIndex >= this.gameSteps.length;
    },

    isGameRunning(): boolean {
      return !this.isPreCountdownRunning && !this.isFinalStep;
    },

    isPreCountdownRunning(): boolean {
      return !this.isGameOver && !this.preGameCountdown.isOver;
    },

    pointsClass() {
      if (this.gamePoints < 5) {
        return "color--red";
      } else if (this.gamePoints >= 4 && this.gamePoints < 8) {
        return "color--white";
      } else if (this.gamePoints >= 8 && this.gamePoints < 12) {
        return "color--green";
      } else if (this.gamePoints >= 12 && this.gamePoints < 15) {
        return "color--blue";
      } else {
        return "color--violet";
      }
    },
  },

  methods: {
    resetGamePhases() {
      this.gamePhases = Array.from({ length: 10 }, (x, i) => ({
        state: i === 0 ? GAME_STATE.UNDECIDED : GAME_STATE.PENDING,
        name: `phase-${i}`,
      }));
    },

    resetGameSteps() {
      let taskLength = 8;
      if (this.phaseIndex > 4 && this.phaseIndex < 8) {
        taskLength = 10;
      } else if (this.phaseIndex >= 8) {
        taskLength = 12;
      }
      this.task.new(taskLength);
      this.solutions = this.task.getPossibleSolutions(2);
      this.actionButtons[1].label = `${this.solutions[0].value}`;
      this.actionButtons[2].label = `${this.solutions[1].value}`;

      this.gameSteps = Array.from({ length: taskLength }, (x, i) => ({
        state: i === 0 ? GAME_STATE.UNDECIDED : GAME_STATE.PENDING,
        name: `step-${i}`,
      }));
    },

    restart() {
      this.isFirstGame = false;
      this.phaseIndex = 0;
      this.stepIndex = 0;
      this.resetGamePhases();
      this.resetGameSteps();
      clearInterval(this.preGameTimeout);
      this.gameTimer.reset();
      this.preGameCountdown.reset();
      this.isGameOver = false;
      this.preGameCountdown.start();

      this.preGameTimeout = setTimeout(() => {
        this.gameTimer.start();
      }, 3000);
    },

    nextStep() {
      this.stepIndex += 1;
      if (this.stepIndex === this.gameSteps.length) {
        this.gameSteps[this.stepIndex - 1].state = GAME_STATE.DONE;
        return;
      }
      if (this.stepIndex > 0) {
        this.gameSteps[this.stepIndex - 1].state = GAME_STATE.DONE;
      }
      this.gameSteps[this.stepIndex].state = GAME_STATE.UNDECIDED;
    },

    commitSolution(index: number) {
      this.phaseIndex += 1;
      this.stepIndex = -1;
      this.nextStep();
      if (this.phaseIndex === 0) return;
      if (this.phaseIndex === this.gamePhases.length) {
        this.gamePhases[this.phaseIndex - 1].state = this.solutions[index]
          .isValid
          ? GAME_STATE.DONE
          : GAME_STATE.ERROR;
        this.endGame();
        return;
      }
      this.gamePhases[this.phaseIndex - 1].state = this.solutions[index].isValid
        ? GAME_STATE.DONE
        : GAME_STATE.ERROR;
      this.gamePhases[this.phaseIndex].state = GAME_STATE.UNDECIDED;
      this.resetGameSteps();
    },

    endGame() {
      this.gameSteps = [];
      this.gameTimer.stop();
      this.isGameOver = true;
    },

    handleKeyDown(event: KeyboardEvent) {
      event.preventDefault();
      switch (event.code) {
        case "KeyB":
          this.$router.push("/");
          break;
        case "Space":
          this.isGameRunning && this.nextStep();
          break;
        case "KeyR":
        case "KeyS":
          this.restart();
          break;
        case "ArrowRight":
          this.isFinalStep && this.commitSolution(1);
          break;
        case "ArrowLeft":
          this.isFinalStep && this.commitSolution(0);
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

  &__game-over-box {
    p {
      margin-bottom: 10px;
      margin-top: 10px;

      &:nth-of-type(2n) {
        font-size: 32px;
      }
    }
  }
}
</style>
