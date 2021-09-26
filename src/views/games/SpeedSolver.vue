<template>
  <game-wrapper
    title="Speed Solver"
    :is-game-over="isGameOver"
    :counter="restartCounter"
    :points="gamePoints"
    :points-class="gamePointsClass"
    @precountdown-over="startGameCountdown"
    @restart="restart"
    @commit-solution-1="commitSolution(0)"
    @commit-solution-2="commitSolution(1)"
    :actionButtons="currentActionButtons"
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
          :value="result.userSolution === result.task.solution"
          >{{
            `${result.task.get()} = ${result.userSolution}`
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
import type { ActionButtonOptions } from "@/data/types";

type TaskResult = { task: Task; userSolution: number };

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
      initialCountdown: new Countdown(3) as Countdown,
      isGameOver: true,
      restartCounter: 0,
      results: [] as TaskResult[],
      solutions: [] as Array<Solution>,
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

    restart() {
      this.restartCounter += 1;
      this.gameCountdown.reset();
      this.initialCountdown.reset();
      this.isGameOver = false;
      this.initialCountdown.start();
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
      this.actionButtons[0].label = "" + this.solutions[0].value;
      this.actionButtons[1].label = "" + this.solutions[1].value;
    },

    commitSolution(index: number) {
      if (this.isGameOver) return;
      this.results.push({
        task: this.task,
        userSolution: this.solutions[index].value,
      });
      this.nextTask();
    },
  },

  computed: {
    currentActionButtons(): ActionButtonOptions[] {
      return this.showSolutionButtons ? actionButtons : [];
    },

    isPreCountdownRunning(): boolean {
      return !this.isGameOver && !this.initialCountdown.isOver;
    },

    showSolutionButtons(): boolean {
      return this.solutions.length > 0 && !this.isGameOver;
    },

    gamePoints(): number {
      let points = 0;
      for (let result of this.results) {
        if (result.task.solution === result.userSolution) {
          points += 1;
        } else {
          points -= 1;
        }
      }
      return points;
    },

    pointsClass() {
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
  &__start-button {
    margin: 0 auto;
  }

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
