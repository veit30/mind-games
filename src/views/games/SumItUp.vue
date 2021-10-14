<template>
  <game-wrapper
    title="Sum It Up"
    :is-game-over="isGameOver"
    :counter="restartCounter"
    :points="gamePoints"
    :points-class="gamePointsClass"
    :action-buttons="actionButtons"
    @precountdown-over="startGameCountdown"
    @restart="restart"
    @commit-solution-1="commitSolution(0)"
    @commit-solution-2="commitSolution(1)"
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
          :key="result.task.get()"
          :value="result.solution.isValid"
          >{{
            `${result.task.get()} = ${result.solution.value}`
          }}</game-info-point
        >
      </div>
    </template>
  </game-wrapper>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import GameWrapper from "@/components/GameWrapper.vue";
import type { FlyOutActionButtonOptions, TaskResult } from "@/data/types";
import { OPERATOR_COLLECTION, OPERATOR } from "@/data/constants";
import CountdownBar from "@/components/CountdownBar.vue";
import Task from "@/data/Task";
import type { Solution } from "@/data/Task";
import Countdown from "@/data/Countdown";
import GameInfoPoint from "@/components/GameInfoPoint.vue";
import GameMatrixDisplay from "@/components/GameMatrixDisplay.vue";
import GameMatrix, { GameMatrixItem } from "@/data/GameMatrix";

const actionButtons: FlyOutActionButtonOptions[] = [
  {
    name: "solution1",
    alternative: "←",
    label: "",
    clickEvent: "commit-solution-1",
    isFullSize: false,
    hasFlyOut: true,
    flyOutTrigger: 0,
  },
  {
    name: "solution2",
    alternative: "→",
    label: "",
    clickEvent: "commit-solution-2",
    isFullSize: false,
    hasExtraBorder: true,
    hasFlyOut: true,
    flyOutTrigger: 0,
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
      gameCountdown: new Countdown(90) as Countdown,
      restartCounter: 0,
      results: [] as TaskResult[],
      solutions: [] as Solution[],
      task: new Task(2, { operators: OPERATOR_COLLECTION.ADD }),
      increment: 2,
      gameMatrix: new GameMatrix(),
    };
  },

  beforeMount() {
    document.addEventListener("keydown", this.handleKeyDown, false);
  },

  beforeUnmount() {
    document.removeEventListener("keydown", this.handleKeyDown, false);
  },

  computed: {
    gamePoints(): number {
      let points = 0;
      for (let result of this.results) {
        let additionalPoints = Math.sqrt(result.task.length) - 1;
        if (!result.solution.isValid) {
          additionalPoints = -1 * Math.floor(additionalPoints / 2);
          points += additionalPoints;
        } else {
          additionalPoints += result.task.operators.includes(OPERATOR.SUBTRACT)
            ? 1
            : 0;
          points += additionalPoints;
        }
      }
      return points;
    },
    gamePointsClass(): string {
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
    restart() {
      this.restartCounter += 1;
      this.increment = 2;
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
      if (completedTasks > 0 && completedTasks % 10 === 0) {
        this.increment += 1;
      }
      let taskLength = this.increment * this.increment;
      this.task = new Task(taskLength, {
        operators: OPERATOR_COLLECTION.ADD,
      });
      if (completedTasks > 0 && completedTasks % 3 === 0) {
        this.task.replaceOperator(
          OPERATOR.ADD,
          OPERATOR.SUBTRACT,
          1 / taskLength
        );
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
        task: this.task,
        solution: this.solutions[index],
      });
      if (this.actionButtons[index].flyOutTrigger >= 0) {
        this.actionButtons[index].flyOutTrigger += 1;
      } else {
        this.actionButtons[index].flyOutTrigger = 0;
      }
      this.nextTask();
    },
    handleKeyDown(event: KeyboardEvent) {
      switch (event.code) {
        case "KeyB":
          event.preventDefault();
          this.$router.push("/");
          break;
        case "KeyR":
        case "KeyS":
          event.preventDefault();
          this.restart();
          break;
        case "ArrowRight":
          event.preventDefault();
          this.commitSolution(1);
          break;
        case "ArrowLeft":
          event.preventDefault();
          this.commitSolution(0);
          break;
      }
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
