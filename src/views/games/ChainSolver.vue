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
    @negate="negateSolution"
    @number="addSolutionNumber"
    @number-delete="deleteFromSolution"
    @confirm="confirmSolution"
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
        {{ isFinalStep ? finalStepDisplay : task.taskSteps[stepIndex] }}
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
    buttonSize: "full",
  },
  {
    name: "-",
    alternative: "-",
    code: "Slash",
    altCode: "NumpadSubtract",
    label: "-",
    clickEvent: {
      event: "negate",
    },
    buttonSize: "third",
  },
  {
    name: "0",
    alternative: "",
    code: "Digit0",
    altCode: "Numpad0",
    label: "0",
    clickEvent: {
      event: "number",
      value: 0,
    },
    buttonSize: "third",
    hasExtraBorder: true,
  },
  {
    name: "delete",
    alternative: "backspace",
    code: "Backspace",
    label: "←",
    clickEvent: {
      event: "number-delete",
    },
    buttonSize: "third",
    hasExtraBorder: true,
  },
  {
    name: "1",
    alternative: "",
    code: "Digit1",
    altCode: "Numpad1",
    label: "1",
    clickEvent: {
      event: "number",
      value: 1,
    },
    buttonSize: "third",
  },
  {
    name: "2",
    alternative: "",
    code: "Digit2",
    altCode: "Numpad2",
    label: "2",
    clickEvent: {
      event: "number",
      value: 2,
    },
    buttonSize: "third",
    hasExtraBorder: true,
  },
  {
    name: "3",
    alternative: "",
    code: "Digit3",
    altCode: "Numpad3",
    label: "3",
    clickEvent: {
      event: "number",
      value: 3,
    },
    buttonSize: "third",
    hasExtraBorder: true,
  },
  {
    name: "4",
    alternative: "",
    code: "Digit4",
    altCode: "Numpad4",
    label: "4",
    clickEvent: {
      event: "number",
      value: 4,
    },
    buttonSize: "third",
  },
  {
    name: "5",
    alternative: "",
    code: "Digit5",
    altCode: "Numpad5",
    label: "5",
    clickEvent: {
      event: "number",
      value: 5,
    },
    buttonSize: "third",
    hasExtraBorder: true,
  },
  {
    name: "6",
    alternative: "",
    code: "Digit6",
    altCode: "Numpad6",
    label: "6",
    clickEvent: {
      event: "number",
      value: 6,
    },
    buttonSize: "third",
    hasExtraBorder: true,
  },
  {
    name: "7",
    alternative: "",
    code: "Digit7",
    altCode: "Numpad7",
    label: "7",
    clickEvent: {
      event: "number",
      value: 7,
    },
    buttonSize: "third",
  },
  {
    name: "8",
    code: "Digit8",
    alternative: "",
    altCode: "Numpad8",
    label: "8",
    clickEvent: {
      event: "number",
      value: 8,
    },
    buttonSize: "third",
    hasExtraBorder: true,
  },
  {
    name: "9",
    alternative: "",
    code: "Digit9",
    altCode: "Numpad9",
    label: "9",
    clickEvent: {
      event: "number",
      value: 9,
    },
    buttonSize: "third",
    hasExtraBorder: true,
  },
  {
    name: "confirm",
    alternative: "space",
    code: "Space",
    label: "Confirm",
    clickEvent: {
      event: "confirm",
    },
    buttonSize: "full",
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
      userSolution: "" as string,
    };
  },

  computed: {
    currentActionButtons(): ActionButtonOptions[] {
      if (this.isGameOver) return [];
      if (!this.isFinalStep) {
        return [this.actionButtons[0]];
      }
      return this.actionButtons.slice(-13);
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
        info: `(${score / 10}x) Solved tasks`,
        value: score,
      });

      scoreElements.push({
        id: 1,
        info: `(${(minusScore / 5) * -1}x)Failed tasks`,
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

    finalStepDisplay(): string {
      return `= ${this.userSolution}`;
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
      this.userSolution = "";
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

    commitSolution(solution: number) {
      if (!this.isFinalStep) return;
      this.phaseIndex += 1;
      this.stepIndex = -1;
      this.nextStep();
      if (this.phaseIndex === 0) return;
      this.gamePhases[this.phaseIndex - 1].state =
        this.task.solution === solution ? GAME_STATE.DONE : GAME_STATE.ERROR;
      if (this.phaseIndex === this.gamePhases.length) {
        this.endGame();
      } else {
        this.gamePhases[this.phaseIndex].state = GAME_STATE.UNDECIDED;
        this.resetGameSteps();
      }
    },

    endGame() {
      this.gameSteps = [];
      this.gameTimer.stop();
      this.isGameOver = true;
    },

    negateSolution() {
      if (!this.userSolution.startsWith("-")) {
        this.userSolution = "-" + this.userSolution;
      } else {
        this.userSolution = this.userSolution.slice(1);
      }
    },

    addSolutionNumber(num: number) {
      this.userSolution = this.userSolution + num;
    },

    deleteFromSolution() {
      this.userSolution = this.userSolution.slice(0, -1);
    },

    confirmSolution() {
      this.commitSolution(parseInt(this.userSolution));
      this.userSolution = "";
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
