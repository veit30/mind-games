<template>
  <div class="speed-solver">
    <h2 class="speed-solver__headline">Speed Solver</h2>
    <div class="speed-solver__container">
      <countdown-bar class="speed-solver__countdown" :max="60" :current="25" />
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
          v-if="isGameOver"
          class="speed-solver__start-button"
          alternative="S"
          :borderless="true"
          :is-large="true"
          @click="restart"
          >Start Game</game-button
        >
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
      <div v-if="solutions.length" class="speed-solver__button-container">
        <game-button
          class="speed-solver__action-button"
          alternative="←"
          @click="commitSolution(0)"
          :is-large="true"
          >{{ solutions[0].value }}</game-button
        >
        <game-button
          class="speed-solver__action-button"
          alternative="→"
          @click="commitSolution(1)"
          :is-large="true"
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

export default defineComponent({
  name: "SpeedSolver",

  components: {
    GameButton,
    CountdownBar,
    GameInfoPoint,
  },

  data() {
    return {
      solutions: [] as Array<Solution>,
      task: new Task() as Task,
      isGameOver: true,
      results: [] as any[],
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
      this.isGameOver = false;
      this.results = [];
      this.nextTask();
    },

    nextTask() {
      this.task = new Task();
      this.solutions = this.task.getPossibleSolutions(2);
    },

    commitSolution(index: number) {
      console.log(index);

      this.results.push({
        task: this.task,
        userSolution: this.solutions[index].value,
      });

      this.nextTask();
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
    margin-top: 155px;
    font-size: 60px;
    text-align: center;
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
    display: flex;
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
}

.margin-horizontal--large {
  margin-left: 80px;
  margin-right: 80px;
}
</style>
