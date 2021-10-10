<template>
  <game-wrapper
    title="Chain Solver"
    :is-game-over="isGameOver"
    :counter="restartCounter"
    :points="gamePoints"
    :points-class="gamePointsClass"
    :action-buttons="currentActionButtons"
    @precountdown-over="startGameTimer"
    @restart="restart"
    @next="nextStep"
    @commit-solution-1="commitSolution(0)"
    @commit-solution-2="commitSolution(1)"
  >
    <template #top>
      <timer-box
        class="chain-solver__timer"
        :timer="gameTimer"
        :threshold="gameTimeThreshold"
      />
    </template>
    <template #default>
      <p>{{ isFinalStep ? "=" : task.taskSteps[stepIndex] }}</p>
    </template>
    <template #bottom>
      <div v-if="!isGameOver" class="chain-solver__steps-container">
        <game-step-indicator
          v-for="step in gameSteps"
          :key="step.name"
          :step="step"
        />
      </div>
      <div v-if="!isGameOver" class="chain-solver__steps-container">
        <game-step-indicator
          v-for="step in gamePhases"
          :key="step.name"
          :step="step"
        />
      </div>
    </template>
  </game-wrapper>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import TimerBox from "@/components/TimerBox.vue";
import GameWrapper from "@/components/GameWrapper.vue";
import Timer from "@/data/Timer";
import Task from "@/data/Task";
import type { Solution } from "@/data/Task";
import type { ActionButtonOptions, GameStep } from "@/data/types";
import { GAME_STATE, OPERATOR_COLLECTION } from "@/data/constants";
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
      isGameOver: true,
      phaseIndex: 0,
      restartCounter: 0,
      solutions: [] as Array<Solution>,
      stepIndex: 0,
      task: new Task(8, {
        isStepped: true,
        operators: OPERATOR_COLLECTION.BASIC,
      }) as Task,
      version: "1.0.1",
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
      if (this.isGameOver) return [];
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
        let r = this.gameTimer.seconds - (this.gameTimeThreshold - 40);
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

    gamePointsClass() {
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
      this.restartCounter += 1;
      this.phaseIndex = 0;
      this.stepIndex = 0;
      this.resetGamePhases();
      this.resetGameSteps();
      this.gameTimer.reset();
      this.isGameOver = false;
    },

    startGameTimer() {
      this.gameTimer.start();
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
      switch (event.code) {
        case "KeyB":
          event.preventDefault();
          this.$router.push("/");
          break;
        case "Space":
          event.preventDefault();
          !this.isFinalStep && this.nextStep();
          break;
        case "KeyR":
        case "KeyS":
          event.preventDefault();
          this.restart();
          break;
        case "ArrowRight":
          event.preventDefault();
          this.isFinalStep && this.commitSolution(1);
          break;
        case "ArrowLeft":
          event.preventDefault();
          this.isFinalStep && this.commitSolution(0);
          break;
      }
    },
  },
});
</script>

<style lang="scss" scoped>
.chain-solver {
  &__timer {
    margin: 2rem auto;
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
