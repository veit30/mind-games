<template>
  <div class="speed-solver">
    <h2 class="speed-solver__headline">Speed Solver</h2>
    <div class="speed-solver__container">
      <countdown-bar
        class="speed-solver__countdown"
        :max="gameCountdown.length"
        :current="gameCountdown.exactValue"
      />
      <div class="speed-solver__button-container margin-horizontal--large">
        <game-button
          class="speed-solver__upper-button"
          alternative="B"
          @click="this.$router.push('/')"
          >Back</game-button
        >
        <game-button
          class="speed-solver__upper-button"
          alternative="R"
          @click="restart"
          >Restart</game-button
        >
      </div>
      <div class="speed-solver__main-container">
        <game-button
          v-if="isGameOver && isFirstGame"
          class="speed-solver__start-button"
          alternative="S"
          :borderless="true"
          :is-large="true"
          @click="restart"
          >Start Game</game-button
        >
        <div
          v-else-if="isGameOver && !isFirstGame"
          class="speed-solver__game-over-box"
        >
          <p>Game Over</p>
          <p>
            Points: <span :class="pointsClass">{{ gamePoints }}</span>
          </p>
        </div>
        <p v-else-if="isPreCountdownRunning">
          {{ initialCountdown.value === 0 ? "" : initialCountdown.value }}
        </p>
        <p v-else>{{ task.get() }}</p>
      </div>
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
      <div v-if="showSolutionButtons" class="speed-solver__button-container">
        <game-button
          class="speed-solver__action-button"
          alternative="←"
          @click="commitSolution(0)"
          :is-large="true"
          style="border-left: 0; border-bottom: 0"
          >{{ solutions[0].value }}</game-button
        >
        <game-button
          class="speed-solver__action-button"
          alternative="→"
          @click="commitSolution(1)"
          :is-large="true"
          style="border-right: 0; border-bottom: 0; border-left: 0"
          >{{ solutions[1].value }}</game-button
        >
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import GameButton from "@/components/GameButton.vue";
import CountdownBar from "@/components/CountdownBar.vue";
import GameInfoPoint from "@/components/GameInfoPoint.vue";
import Task from "@/data/Task";
import type { Solution } from "@/data/Task";
import { randomIntInRange } from "@/helpers/util";
import Countdown from "@/data/Countdown";

type TaskResult = { task: Task; userSolution: number };

export default defineComponent({
  name: "SpeedSolver",

  components: {
    GameButton,
    CountdownBar,
    GameInfoPoint,
  },

  data() {
    return {
      gameCountdown: new Countdown() as Countdown,
      gameTimer: 0 as number,
      initialCountdown: new Countdown(3) as Countdown,
      isFirstGame: true,
      isGameOver: true,
      results: [] as TaskResult[],
      solutions: [] as Array<Solution>,
      task: {} as Task,
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
      this.isFirstGame = false;
      clearInterval(this.gameTimer);
      this.gameCountdown.reset();
      this.initialCountdown.reset();
      this.isGameOver = false;
      this.initialCountdown.start();
      this.results = [];
      this.solutions = [];
      this.nextTask();

      this.gameTimer = setTimeout(() => {
        this.gameCountdown = new Countdown(60);
        this.gameCountdown.start();
      }, 3000);
    },

    endGame() {
      this.isGameOver = true;
    },

    nextTask() {
      this.task = new Task();
      this.solutions = this.task.getPossibleSolutions(2);
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
    isPreCountdownRunning(): boolean {
      return !this.isGameOver && !this.initialCountdown.isOver;
    },

    showSolutionButtons(): boolean {
      return (
        this.solutions.length > 0 &&
        !this.isPreCountdownRunning &&
        !this.isGameOver
      );
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
        return "points-0";
      } else if (this.gamePoints >= 0 && this.gamePoints < 25) {
        return "points-1";
      } else if (this.gamePoints >= 25 && this.gamePoints < 40) {
        return "points-2";
      } else if (this.gamePoints >= 40 && this.gamePoints < 60) {
        return "points-3";
      } else {
        return "points-4";
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
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  user-select: none;

  &__main-container {
    margin-top: 100px;
    font-size: 60px;
    text-align: center;

    button {
      margin-top: 55px;
    }
  }

  &__upper-button {
    min-width: 100px;
  }

  &__action-button {
    width: 50%;
    height: 100px;
  }

  &__start-button {
    margin: 0 auto;
  }

  &__countdown {
    margin: 40px auto;
  }

  &__button-container {
    display: flex;
    justify-content: space-between;
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

  &__container {
    border: 1px solid $color-border-dark;
    background: $color-background-dark;
    width: 550px;
    height: 750px;
    margin-top: 30px;
    display: flex;
    flex-direction: column;
  }

  &__game-over-box {
    p {
      margin-bottom: 10px;
      margin-top: 10px;

      &:nth-of-type(2n) {
        font-size: 32px;
      }
    }

    span {
      &.points-0 {
        color: $red;
      }

      &.points-1 {
        color: $white;
      }

      &.points-2 {
        color: $green;
      }

      &.points-3 {
        color: $blue;
      }

      &.points-4 {
        color: $violet;
      }
    }
  }
}

.margin-horizontal--large {
  margin-left: 80px;
  margin-right: 80px;
}
</style>
