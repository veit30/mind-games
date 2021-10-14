<template>
  <game-wrapper
    title="Count Up"
    :is-game-over="isGameOver"
    :counter="restartCounter"
    :points="gamePoints"
    :points-class="gamePointsClass"
    :action-buttons="currentActionButtons"
    @precountdown-over="newRound"
    @restart="restart"
  >
    <template #top>
      <timer-box :timer="gameTimer" :threshold="gameTimeThreshold" />
    </template>

    <template #default>
      <game-matrix-display class="count-up__matrix" :matrix="gameMatrix" />
    </template>

    <template #bottom> </template>
  </game-wrapper>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import GameWrapper from "@/components/GameWrapper.vue";
import type { ActionButtonOptions } from "@/data/types";
import GameMatrix from "@/data/GameMatrix";
import GameMatrixDisplay from "@/components/GameMatrixDisplay.vue";
import TimerBox from "@/components/TimerBox.vue";
import Timer from "@/data/Timer";

const actionButtons: ActionButtonOptions[] = [];

export default defineComponent({
  name: "CountUp",

  components: {
    GameWrapper,
    GameMatrixDisplay,
    TimerBox,
  },

  data() {
    return {
      actionButtons,
      isGameOver: true,
      restartCounter: 0,
      gameMatrix: new GameMatrix(),
      gameTimer: new Timer(),
      gameTimeThreshold: 0,
    };
  },

  beforeMount() {
    document.addEventListener("keydown", this.handleKeyDown, false);
  },

  beforeUnmount() {
    document.removeEventListener("keydown", this.handleKeyDown, false);
  },

  computed: {
    currentActionButtons(): ActionButtonOptions[] {
      return [];
    },
    gamePoints(): number {
      let points = 0;
      return points;
    },
    gamePointsClass(): string {
      return "";
    },
  },

  methods: {
    restart(): void {
      this.restartCounter += 1;
      this.isGameOver = false;
    },
    endGame(): void {
      this.isGameOver = true;
    },
    newRound() {
      this.gameMatrix.generateNumberMatrix(5, 4, true);
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
      }
    },
  },
});
</script>

<style lang="scss" scoped>
.count-up {
  &__matrix {
    margin-top: 4rem;
  }
}
</style>
