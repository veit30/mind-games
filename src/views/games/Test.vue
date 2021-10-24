<template>
  <game-wrapper
    title="Test"
    name="SpeedSolver"
    :is-game-over="isGameOver"
    :counter="restartCounter"
    :score="score"
    :scoreElements="scoreElements"
    :action-buttons="currentActionButtons"
    :hasNoPreCountdown="true"
    @precountdown-over="start"
    @restart="restart"
  >
    <template #top> </template>

    <template #default> </template>

    <template #bottom> </template>
  </game-wrapper>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import GameWrapper from "@/components/GameWrapper.vue";
import type { ActionButtonOptions, ScoreElement } from "@/data/types";
import Task from "@/data/Task";
import { OPERATOR_COLLECTION } from "@/data/constants";

const actionButtons: ActionButtonOptions[] = [];

export default defineComponent({
  name: "Test",

  components: {
    GameWrapper,
  },

  data() {
    return {
      actionButtons,
      isGameOver: true,
      restartCounter: 1,
      scoreElements: [
        {
          id: 0,
          info: "Game clear",
          value: 30,
        },
        {
          id: 1,
          info: "Wrong answer",
          value: -1,
        },
      ] as ScoreElement[],
    };
  },

  beforeMount() {
    document.addEventListener("keydown", this.handleKeyDown, false);
  },

  beforeUnmount() {
    document.removeEventListener("keydown", this.handleKeyDown, false);
  },

  mounted() {
    let t = new Task(2, { operators: OPERATOR_COLLECTION.FULL });
    console.log(t.solution);
    console.log(t.fakeSolution);

    // t.fakeSolution
  },

  computed: {
    currentActionButtons(): ActionButtonOptions[] {
      return [];
    },
    score(): number {
      let score = 70;
      return score;
    },
  },

  methods: {
    restart(): void {
      this.restartCounter += 1;
      this.isGameOver = false;
      let t = new Task(4, { operators: OPERATOR_COLLECTION.FULL });
      console.log(t.taskSteps);
      console.log(t.segmentsWithSign);
    },
    start(): void {
      let t = new Task(4, { operators: OPERATOR_COLLECTION.FULL });
      console.log(t.taskSteps);
    },
    endGame(): void {
      this.isGameOver = true;
    },
    handleKeyDown(event: KeyboardEvent) {
      console.log(event.code);
    },
  },
});
</script>

<style lang="scss" scoped>
.test {
}
</style>
