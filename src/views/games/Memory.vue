<template>
  <game-wrapper
    title="Memory"
    name="Memory"
    :is-game-over="isGameOver"
    :counter="restartCounter"
    :points="gamePoints"
    :action-buttons="currentActionButtons"
    @precountdown-over="start"
    @restart="restart"
  >
    <template #top>
      <timer-box
        class="memory__timer"
        :timer="gameTimer"
        :threshold="gameTimeThreshold"
      />
    </template>

    <template #default>
      <p class="memory__instruction">{{ text }}</p>
      <game-matrix-display
        class="memory__memory"
        :matrix="memory"
        :max-width="matrixDisplayWidth"
        @item-click="clickMemoryItem"
      />
    </template>

    <template #bottom> </template>
  </game-wrapper>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import GameWrapper from "@/components/GameWrapper.vue";
import type { ActionButtonOptions } from "@/data/types";
import Memory from "@/data/Memory";
import GameMatrixDisplay from "@/components/GameMatrixDisplay.vue";
import TimerBox from "@/components/TimerBox.vue";
import Timer from "@/data/Timer";

const actionButtons: ActionButtonOptions[] = [
  {
    name: "turn",
    alternative: "space",
    code: "Space",
    label: "Turn",
    clickEvent: {
      event: "turn",
    },
    isFullSize: true,
  },
];

export default defineComponent({
  name: "Memory",

  components: {
    GameWrapper,
    TimerBox,
    GameMatrixDisplay,
  },

  data() {
    return {
      actionButtons,
      isGameOver: true,
      restartCounter: 0,
      memory: new Memory(),
      gameTimer: new Timer(),
      matrixDisplayWidth: 20,
      gamePhase: 0,
      gameTimeThreshold: 55,
    };
  },

  computed: {
    currentActionButtons(): ActionButtonOptions[] {
      return actionButtons;
    },
    gamePoints(): number {
      let points = 0;
      return points;
    },
    text(): string {
      return "🐶🐱🐭";
    },
  },

  methods: {
    restart(): void {
      this.restartCounter += 1;
      this.isGameOver = false;
      this.gamePhase = 0;
      this.memory.generateItems(5, 4);
      console.log(this.memory.items);
    },
    endGame(): void {
      this.isGameOver = true;
    },
    start() {
      this.gameTimer.start();
      this.gamePhase = 1;
    },
    clickMemoryItem(id: number) {
      console.log(id);
    },
  },
});
</script>

<style lang="scss" scoped>
.memory {
  &__instruction {
    text-align: center;
    margin-top: 2.5rem;
    margin-bottom: 2rem;
    font-size: 1.5rem;
  }

  &__memory {
    margin-top: 4rem;
  }

  &__timer {
    margin: 2rem auto;
  }
}
</style>
