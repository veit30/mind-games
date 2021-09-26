<template>
  <game-wrapper
    title="Sum It Up"
    :is-game-over="isGameOver"
    :counter="restartCounter"
    :points="gamePoints"
    :points-class="gamePointsClass"
    :actionButtons="actionButtons"
    @precountdown-over="startGameCountdown"
    @restart="restart"
    @commit-solution-1="commitSolution(0)"
    @commit-solution-2="commitSolution(1)"
  >
    <template #top>
      <countdown-bar class="sum-it-up__countdown" :countdown="gameCountdown" />
    </template>

    <template #default>
      <game-squares :items="currentItems" />
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
import type { ActionButtonOptions, TaskResult } from "@/data/types";
import { OPERATOR_COLLECTION, OPERATOR } from "@/data/constants";
import CountdownBar from "@/components/CountdownBar.vue";
import Task from "@/data/Task";
import type { Solution } from "@/data/Task";
import Countdown from "@/data/Countdown";
import GameSquares from "@/components/GameSquares.vue";
import type { SquareItem } from "@/data/types";
import GameInfoPoint from "@/components/GameInfoPoint.vue";

const actionButtons: ActionButtonOptions[] = [
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
  name: "SumItUp",

  components: {
    GameWrapper,
    CountdownBar,
    GameSquares,
    GameInfoPoint,
  },

  data() {
    return {
      actionButtons,
      isGameOver: true,
      gameCountdown: new Countdown(60) as Countdown,
      restartCounter: 0,
      results: [] as TaskResult[],
      solutions: [] as Solution[],
      task: new Task(2, { operators: OPERATOR_COLLECTION.ADD }),
      increment: 2,
      version: "1.0.0",
    };
  },

  beforeMount() {
    document.addEventListener("keydown", this.handleKeyDown, false);
  },

  beforeUnmount() {
    document.removeEventListener("keydown", this.handleKeyDown, false);
  },

  computed: {
    currentItems(): SquareItem[] {
      return this.task.segmentsWithSign.map(
        (taskSegment: string, i: number) => {
          return {
            key: `task-part-${i}`,
            value: taskSegment,
          };
        }
      );
    },
    gamePoints(): number {
      let points = 0;
      for (let result of this.results) {
        let additionalPoints = Math.sqrt(result.task.length) - 1;
        additionalPoints += result.task.operators.includes(OPERATOR.SUBTRACT)
          ? 1
          : 0;
        if (!result.solution.isValid) {
          additionalPoints -= 1;
        }
        points += additionalPoints;
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
      if (completedTasks > 0 && completedTasks % 8 === 0) {
        this.increment += 1;
      }
      let taskLength = this.increment * this.increment;
      if (completedTasks > 0 && completedTasks % 4 === 0) {
        this.task = new Task(taskLength, {
          operators: OPERATOR_COLLECTION.BASIC,
        });
      } else {
        this.task = new Task(taskLength, {
          operators: OPERATOR_COLLECTION.ADD,
        });
      }
      this.solutions = this.task.getPossibleSolutions(2);
      this.actionButtons[0].label = `${this.solutions[0].value}`;
      this.actionButtons[1].label = `${this.solutions[1].value}`;
    },
    commitSolution(index: number) {
      if (this.isGameOver) return;
      this.results.push({
        task: this.task,
        solution: this.solutions[index],
      });
      this.nextTask();
    },
    handleKeyDown(event: KeyboardEvent) {
      event.preventDefault();
      switch (event.code) {
        case "KeyB":
          this.$router.push("/");
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

  &__countdown {
    margin: 40px auto;
  }
}
</style>
