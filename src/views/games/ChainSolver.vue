<template>
  <game-wrapper
    title="Chain Solver"
    name="ChainSolver"
    :is-game-over="isGameOver"
    :counter="restartCounter"
    :score-elements="scoreElements"
    :action-buttons="currentActionButtons"
    @precountdown-over="startGameTimer"
    @restart="restart"
    @next="nextStep"
    @commit-solution="commitSolution"
  >
    <template #top>
      <timer-box
        class="chain-solver__timer"
        :timer="gameTimer"
        :threshold="gameTimeThreshold"
      />
    </template>
    <template #default>
      <p class="chain-solver__task">
        {{ isFinalStep ? "=" : task.taskSteps[stepIndex] }}
      </p>
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
import { ScoreElement } from "@/data/types";

const actionButtons: ActionButtonOptions[] = [
  {
    name: "next",
    alternative: "space",
    code: "Space",
    label: "Next",
    clickEvent: {
      event: "next",
    },
    isFullSize: true,
  },
  {
    name: "solution1",
    alternative: "←",
    code: "ArrowLeft",
    label: "",
    clickEvent: {
      event: "commit-solution",
      value: 0,
    },
    isFullSize: false,
  },
  {
    name: "solution2",
    alternative: "→",
    code: "ArrowRight",
    label: "",
    clickEvent: {
      event: "commit-solution",
      value: 1,
    },
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
      gameTimeThreshold: 60,
      isGameOver: true,
      phaseIndex: 0,
      restartCounter: 0,
      solutions: [] as Array<Solution>,
      stepIndex: 0,
      task: new Task(8, {
        isStepped: true,
        operators: OPERATOR_COLLECTION.BASIC,
      }) as Task,
    };
  },

  computed: {
    currentActionButtons(): ActionButtonOptions[] {
      if (this.isGameOver) return [];
      if (!this.isFinalStep) {
        return this.actionButtons.slice(0, 1);
      }
      return this.actionButtons.slice(-2);
    },

    scoreElements(): ScoreElement[] {
      let scoreElements = [];
      let score = 0;
      let minusScore = 0;
      this.gamePhases.forEach((phase) => {
        score += phase.state === GAME_STATE.DONE ? 10 : 0;
        minusScore += phase.state === GAME_STATE.ERROR ? -5 : 0;
      });

      scoreElements.push({
        id: 0,
        info: "Solved tasks",
        value: score,
      });

      scoreElements.push({
        id: 1,
        info: "Failed tasks",
        value: minusScore,
      });

      if (score > 20) {
        let timeScore = this.gameTimeThreshold - this.gameTimer.seconds;
        timeScore = timeScore > 0 ? timeScore : 0;
        scoreElements.push({
          id: 2,
          info: "Time bonus",
          value: timeScore,
        });
      }
      return scoreElements;
    },

    isFinalStep(): boolean {
      return this.stepIndex >= this.gameSteps.length;
    },
  },

  methods: {
    resetGamePhases() {
      this.gamePhases = Array.from({ length: 3 }, (x, i) => ({
        state: i === 0 ? GAME_STATE.UNDECIDED : GAME_STATE.PENDING,
        name: `phase-${i}`,
      }));
    },

    resetGameSteps() {
      let taskLength = 8 + 2 * this.phaseIndex;
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
      if (this.isFinalStep) return;
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
      if (!this.isFinalStep) return;
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

  &__task {
    font-size: 4rem;
    text-align: center;
    margin-top: 6rem;
  }
}
</style>
