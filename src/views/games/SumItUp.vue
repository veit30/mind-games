<template>
  <game-wrapper
    title="Sum It Up"
    name="SumItUp"
    :is-game-over="isGameOver"
    :counter="restartCounter"
    :score-elements="scoreElements"
    :action-buttons="actionButtons"
    @precountdown-over="startGameCountdown"
    @restart="restart"
    @commit-solution="commitSolution"
  >
    <template #top>
      <countdown-bar class="sum-it-up__countdown" :countdown="gameCountdown" />
    </template>

    <template #default>
      <game-matrix-display class="sum-it-up__matrix" :matrix="gameMatrix" />
    </template>

    <template #bottom>
      <div class="sum-it-up__points-container">
        <game-info-point
          v-for="result in results"
          :key="result.id"
          :value="result.value"
          >{{ result.info }}</game-info-point
        >
      </div>
    </template>
  </game-wrapper>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import GameWrapper from "@/components/GameWrapper.vue";
import type { FlyOutActionButtonOptions, GameInfo } from "@/data/types";
import { OPERATOR_COLLECTION, OPERATOR } from "@/data/constants";
import CountdownBar from "@/components/CountdownBar.vue";
import Task from "@/data/Task";
import type { Solution } from "@/data/Task";
import Countdown from "@/data/Countdown";
import GameInfoPoint from "@/components/GameInfoPoint.vue";
import GameMatrixDisplay from "@/components/GameMatrixDisplay.vue";
import GameMatrix, { GameMatrixItem } from "@/data/GameMatrix";
import { ScoreElement } from "@/data/types";

const actionButtons: FlyOutActionButtonOptions[] = [
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
    hasFlyOut: true,
    actionCounter: 0,
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
    hasFlyOut: true,
    actionCounter: 0,
  },
];

export default defineComponent({
  name: "SumItUp",

  components: {
    GameWrapper,
    CountdownBar,
    GameInfoPoint,
    GameMatrixDisplay,
  },

  data() {
    return {
      actionButtons,
      isGameOver: true,
      gameCountdown: new Countdown(60) as Countdown,
      restartCounter: 0,
      results: [] as GameInfo[],
      solutions: [] as Solution[],
      task: new Task(2, { operators: OPERATOR_COLLECTION.ADD }),
      gameMatrix: new GameMatrix(),
    };
  },

  computed: {
    scoreElements(): ScoreElement[] {
      let score = 0;
      let minusScore = 0;
      let extraPoints = 0;

      this.results.forEach((res) => {
        score += res.value ? 1 : 0;
        minusScore += !res.value ? -1 : 0;
        extraPoints += res.info.includes(OPERATOR.SUBTRACT) ? 1 : 0;
      });

      return [
        {
          id: 0,
          info: "Solved tasks",
          value: score,
        },
        {
          id: 1,
          info: "Failed tasks",
          value: minusScore,
        },
        {
          id: 2,
          info: "Tasks including subtract",
          value: extraPoints,
        },
      ];
    },
  },

  methods: {
    restart() {
      this.restartCounter += 1;
      this.gameCountdown.reset();
      this.isGameOver = false;
      this.results = [];
      this.solutions = [];
      this.nextTask();
    },
    startGameCountdown() {
      this.gameCountdown.start();
    },
    endGame() {
      this.isGameOver = true;
    },
    nextTask() {
      let completedTasks = this.results.length;
      this.task = new Task(4, {
        operators: OPERATOR_COLLECTION.ADD,
      });
      if (completedTasks > 0 && completedTasks % 5 === 0) {
        this.task.replaceOperator(OPERATOR.ADD, OPERATOR.SUBTRACT, 0.25);
      }
      this.solutions = this.task.getPossibleSolutions(2);
      this.actionButtons[0].label = `${this.solutions[0].value}`;
      this.actionButtons[1].label = `${this.solutions[1].value}`;
      let items = this.task.segmentsWithSign.map(
        (taskSegment: string, i: number) => {
          return new GameMatrixItem(taskSegment, i);
        }
      );
      this.gameMatrix.items = items;
    },
    commitSolution(index: number) {
      if (this.isGameOver) return;
      this.results.push({
        id: this.results.length,
        info: `${this.task} = ${this.solutions[index].value}`,
        value: this.solutions[index].isValid,
      });
      if (this.actionButtons[index].actionCounter >= 0) {
        this.actionButtons[index].actionCounter += 1;
      } else {
        this.actionButtons[index].actionCounter = 0;
      }
      this.nextTask();
    },
  },
  watch: {
    gameCountdown: {
      deep: true,
      handler(countdown) {
        if (countdown.isOver) {
          this.endGame();
        }
      },
    },
  },
});
</script>

<style lang="scss" scoped>
.sum-it-up {
  &__points-container {
    margin-top: auto;
    margin-bottom: 20px;
    margin-right: 30px;
    margin-left: 30px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }

  &__game-squares {
    margin-top: 4rem;
  }

  &__matrix {
    margin-top: 4rem;
  }
}
</style>
