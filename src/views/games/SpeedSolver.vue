<template>
  <game-wrapper
    title="Speed Solver"
    name="SpeedSolver"
    :is-game-over="isGameOver"
    :counter="restartCounter"
    :action-buttons="actionButtons"
    :score-elements="scoreElements"
    @precountdown-over="startGameCountdown"
    @restart="restart"
    @commit-solution="commitSolution"
  >
    <template #top>
      <countdown-bar
        class="speed-solver__countdown"
        :countdown="gameCountdown"
      />
    </template>
    <template #default>
      <p class="speed-solver__task">{{ task + "" }}</p>
    </template>
    <template #bottom>
      <div class="speed-solver__points-container">
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
import CountdownBar from "@/components/CountdownBar.vue";
import GameInfoPoint from "@/components/GameInfoPoint.vue";
import GameWrapper from "@/components/GameWrapper.vue";
import Task from "@/data/Task";
import type { Solution } from "@/data/Task";
import Countdown from "@/data/Countdown";
import type { FlyOutActionButtonOptions, GameInfo } from "@/data/types";
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
  name: "SpeedSolver",

  components: {
    CountdownBar,
    GameInfoPoint,
    GameWrapper,
  },

  data() {
    return {
      actionButtons,
      gameCountdown: new Countdown(60) as Countdown,
      isGameOver: true,
      restartCounter: 0,
      results: [] as GameInfo[],
      solutions: [] as Solution[],
      task: new Task() as Task,
    };
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
      this.task = new Task();
      this.solutions = this.task.getPossibleSolutions(2);
      this.actionButtons[0].label = `${this.solutions[0].value}`;
      this.actionButtons[1].label = `${this.solutions[1].value}`;
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

  computed: {
    scoreElements(): ScoreElement[] {
      let score = 0;
      let scoreElements = [];
      this.results.forEach((res) => {
        score += res.value ? 1 : 0;
      });

      scoreElements.push({
        id: 0,
        info: "Solved tasks",
        value: score,
      });

      score = 0;

      this.results.forEach((res) => {
        score += !res.value ? 1 : 0;
      });

      scoreElements.push({
        id: 1,
        info: "Failed tasks",
        value: -score,
      });

      return scoreElements;
    },
  },

  watch: {
    gameCountdown: {
      deep: true,
      handler(newVal) {
        if (newVal.isOver) {
          this.endGame();
        }
      },
    },
  },
});
</script>

<style lang="scss" scoped>
.speed-solver {
  &__countdown {
    margin: 2.5rem auto;
  }

  &__points-container {
    margin-top: auto;
    margin-bottom: 20px;
    margin-right: 30px;
    margin-left: 30px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }

  &__task {
    font-size: 4rem;
    text-align: center;
    margin-top: 6rem;
  }
}
</style>
