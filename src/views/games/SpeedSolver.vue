<template>
  <game-wrapper
    title="Speed Solver"
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
      <countdown-bar
        class="speed-solver__countdown"
        :countdown="gameCountdown"
      />
    </template>
    <template #default>
      <p>{{ task.get() }}</p>
    </template>
    <template #bottom>
      <div class="speed-solver__points-container">
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
import CountdownBar from "@/components/CountdownBar.vue";
import GameInfoPoint from "@/components/GameInfoPoint.vue";
import GameWrapper from "@/components/GameWrapper.vue";
import Task from "@/data/Task";
import type { Solution } from "@/data/Task";
import Countdown from "@/data/Countdown";
import type { FlyOutActionButtonOptions, TaskResult } from "@/data/types";

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
      results: [] as TaskResult[],
      solutions: [] as Solution[],
      task: new Task() as Task,
      version: "1.0.1",
    };
  },

  beforeMount() {
    document.addEventListener("keydown", this.handleKeyDown, false);
  },

  beforeUnmount() {
    document.removeEventListener("keydown", this.handleKeyDown, false);
  },

  methods: {
    handleKeyDown(event: KeyboardEvent) {
      //TODO: visually represent keypress on buttons
      //this might require keydown and keyup events

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
  },

  computed: {
    gamePoints(): number {
      let points = 0;
      for (let result of this.results) {
        if (result.solution.isValid) {
          points += 1;
        } else {
          points -= 1;
        }
      }
      return points;
    },

    gamePointsClass() {
      if (this.gamePoints < 0) {
        return "color--red";
      } else if (this.gamePoints >= 0 && this.gamePoints < 25) {
        return "color--white";
      } else if (this.gamePoints >= 25 && this.gamePoints < 40) {
        return "color--green";
      } else if (this.gamePoints >= 40 && this.gamePoints < 60) {
        return "color--blue";
      } else {
        return "color--violet";
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
.speed-solver {
  &__countdown {
    margin: 40px auto;
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
}
</style>
