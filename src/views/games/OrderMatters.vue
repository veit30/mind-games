<template>
  <game-wrapper
    title="Order Matters"
    name="OrderMatters"
    :is-game-over="isGameOver"
    :counter="restartCounter"
    :score-elements="scoreElements"
    :action-buttons="currentActionButtons"
    :instruction="currentInstruction"
    @submit-matrix="submitMatrix"
    @precountdown-over="startShowTimer"
    @restart="restart"
  >
    <template #default>
      <game-matrix-display
        class="memory-matrix__game-matrix"
        :matrix="currentMatrix"
        :spaced-items="true"
        :max-width="maxMatrixDisplayWidth"
        @item-click="handleItemClick"
      />
    </template>
  </game-wrapper>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import GameWrapper from "@/components/GameWrapper.vue";
import type { ActionButtonOptions } from "@/data/types";
import { ScoreElement } from "@/data/types";
import GameMatrix from "@/data/GameMatrix";
import Timer from "@/data/Timer";
import GameMatrixDisplay from "@/components/GameMatrixDisplay.vue";

const actionButtons: ActionButtonOptions[] = [
  {
    name: "submit",
    alternative: "space",
    label: "Submit Matrix",
    clickEvent: {
      event: "submit-matrix",
    },
    isFullSize: true,
  },
];

export default defineComponent({
  name: "OrderMatters",

  components: {
    GameWrapper,
    GameMatrixDisplay,
  },

  data() {
    return {
      actionButtons,
      isGameOver: true,
      restartCounter: 0,
      gamePhase: 0,
      gameMatrix: new GameMatrix(),
      userMatrix: new GameMatrix(),
      showTimer: new Timer(),
      round: 0,
      showMatrix: new GameMatrix(),
      instructions: [
        "Memorize the order",
        "Fill the pattern in the right order",
      ],
      globalTimingValue: 0,
      currentOrderIndex: 0,
    };
  },

  computed: {
    currentActionButtons(): ActionButtonOptions[] {
      return [];
    },
    scoreElements(): ScoreElement[] {
      return [
        {
          id: 0,
          info: "Completed rounds",
          value: this.round,
        },
      ];
    },
    currentInstruction(): string {
      return this.instructions[this.gamePhase];
    },
    currentMatrix(): GameMatrix {
      if (this.gamePhase === 0) {
        return this.showMatrix;
      } else {
        return this.userMatrix;
      }
    },
    maxMatrixDisplayWidth() {
      return 20;
    },
    currentSteps(): number {
      let steps = Math.floor((this.round + 1) / 3) + 2;
      return steps > 9 ? 9 : steps;
    },
  },

  methods: {
    restart(): void {
      this.restartCounter += 1;
      this.isGameOver = false;
      this.round = 0;
      this.gamePhase = 0;
      (this.globalTimingValue = 0),
        (this.currentOrderIndex = 0),
        this.newMatrix();
    },
    endGame(): void {
      this.isGameOver = true;
    },
    newMatrix() {
      this.gameMatrix = new GameMatrix();
      this.gameMatrix.generateItems(3, 3, false);
      this.gameMatrix.changeItemValue(this.currentSteps, true);
      this.gameMatrix.shuffle();

      this.userMatrix = new GameMatrix();
      this.userMatrix.generateItems(3, 3, false, true);

      this.showMatrix = new GameMatrix();
      this.showMatrix.generateItems(3, 3, false);
    },
    startShowTimer() {
      this.showTimer.reset();
      this.showTimer.start();
    },
    nextRound(): void {
      this.round += 1;
      this.globalTimingValue = 0;
      this.currentOrderIndex = 0;
      this.gamePhase = 0;
      this.newMatrix();
      this.startShowTimer();
    },
    submitMatrix(): void {
      if (this.gameMatrix.compareTo(this.userMatrix)) {
        this.nextRound();
      } else {
        this.endGame();
      }
    },
    handleItemClick(id: number): void {
      let index = this.userMatrix.getIndex(id);
      let gameId = this.gameMatrix.items[index].id;
      let item = this.userMatrix.get(id);
      if (item) {
        item.value = true;
      }
      if (gameId === this.currentOrderIndex) {
        this.currentOrderIndex += 1;
      } else {
        this.isGameOver = true;
      }
      if (this.currentOrderIndex === this.currentSteps) {
        this.nextRound();
      }
    },
  },
  watch: {
    showTimer: {
      deep: true,
      handler(newVal) {
        if (
          newVal.seconds > this.globalTimingValue &&
          newVal.seconds < this.currentSteps + 1
        ) {
          let id = this.showTimer.seconds - 1;
          let itemIndex = this.gameMatrix.getIndex(id);
          let item = this.gameMatrix.get(id);
          if (item) {
            this.showMatrix.setItem(item, itemIndex);
            this.globalTimingValue = newVal.seconds;
          }
        }
        if (newVal.seconds >= this.currentSteps + 1) {
          this.showTimer.stop();
          this.gamePhase = 1;
        }
      },
    },
  },
});
</script>

<style lang="scss" scoped></style>
