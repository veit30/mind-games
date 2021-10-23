<template>
  <game-wrapper
    title="Memory"
    name="Memory"
    :is-game-over="isGameOver"
    :counter="restartCounter"
    :score-elements="scoreElements"
    :action-buttons="currentActionButtons"
    :instruction="currentInstruction"
    @precountdown-over="gamePhase = 0"
    @turn="turnMemory"
    @restart="restart"
  >
    <template #default>
      <game-matrix-display
        class="memory__memory"
        :matrix="memory"
        :max-width="matrixDisplayWidth"
        :has-disabled-style="true"
        @item-click="clickMemoryItem"
      />
    </template>

    <template #bottom>
      <div class="memory__false-pairs-container">
        <game-info-point
          v-for="point in falsePairs"
          :key="point.id"
          :value="point.value"
        >
          {{ point.info }}
        </game-info-point>
      </div>
    </template>
  </game-wrapper>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import GameWrapper from "@/components/GameWrapper.vue";
import type { ActionButtonOptions, GameInfo } from "@/data/types";
import Memory from "@/data/Memory";
import GameMatrixDisplay from "@/components/GameMatrixDisplay.vue";
import { GameMatrixItem } from "@/data/GameMatrix";
import GameInfoPoint from "@/components/GameInfoPoint.vue";
import { ScoreElement } from "@/data/types";

const actionButtons: ActionButtonOptions[] = [
  {
    name: "turn",
    alternative: "space",
    code: "Space",
    label: "Turn",
    clickEvent: {
      event: "turn",
    },
    buttonSize: "full",
  },
];

export default defineComponent({
  name: "Memory",

  components: {
    GameWrapper,
    GameMatrixDisplay,
    GameInfoPoint,
  },

  data() {
    return {
      actionButtons,
      isGameOver: true,
      restartCounter: 0,
      memory: new Memory(),
      matrixDisplayWidth: 26,
      gamePhase: 0,
      gameTimeThreshold: 55,
      instructions: ["Memorize the pairs", "Find the pairs"],
      lastSelectedItems: [] as GameMatrixItem[],
      falsePairs: [] as GameInfo[],
      foundItemPairIds: [] as number[],
      memoryPickTimeout: 0,
    };
  },

  computed: {
    currentActionButtons(): ActionButtonOptions[] {
      if (this.gamePhase === 0) {
        return this.actionButtons;
      }
      return [];
    },
    scoreElements(): ScoreElement[] {
      return [
        {
          id: 0,
          info: "Game clear",
          value: 15,
        },
        {
          id: 1,
          info: "Wrong pairs",
          value: -this.falsePairs.length,
        },
      ];
    },
    currentInstruction(): string {
      return this.instructions[this.gamePhase];
    },
  },

  methods: {
    restart(): void {
      clearTimeout(this.memoryPickTimeout);
      this.restartCounter += 1;
      this.isGameOver = false;
      this.gamePhase = -1;
      this.falsePairs = [];
      this.lastSelectedItems = [];
      this.memory.generateItems(6, 5, false);
    },
    endGame(): void {
      this.isGameOver = true;
    },
    clickMemoryItem(id: number) {
      let item = this.memory.get(id);
      if (!item || this.lastSelectedItems.length >= 2) return;
      clearTimeout(this.memoryPickTimeout);
      item.isValueHidden = false;
      item.isClickable = false;
      item.isSelected = true;
      this.lastSelectedItems.push(item);
      if (this.lastSelectedItems.length === 2) {
        if (
          this.lastSelectedItems[0].value === this.lastSelectedItems[1].value
        ) {
          this.lastSelectedItems[0].isSelected = false;
          this.lastSelectedItems[1].isSelected = false;
          this.foundItemPairIds.push(this.lastSelectedItems[0].id);
          this.foundItemPairIds.push(this.lastSelectedItems[1].id);
          this.lastSelectedItems = [];
        } else {
          this.falsePairs.push({
            id: this.falsePairs.length,
            value: false,
            info: `Wrong match: [${this.lastSelectedItems[0].value}:${this.lastSelectedItems[1].value}]`,
          });
          this.lastSelectedItems[0].isSelected = false;
          this.lastSelectedItems[1].isSelected = false;
          this.memoryPickTimeout = setTimeout(() => {
            this.lastSelectedItems[0].isValueHidden = true;
            this.lastSelectedItems[0].isClickable = true;
            this.lastSelectedItems[1].isValueHidden = true;
            this.lastSelectedItems[1].isClickable = true;

            this.lastSelectedItems = [];
          }, 1000);
        }
      }
    },
    turnMemory() {
      if (this.gamePhase < 0) return;
      this.memory.hide(true);
      this.gamePhase = 1;
    },
  },

  watch: {
    foundItemPairIds: {
      deep: true,
      handler(newVal) {
        if (newVal.length >= this.memory.size) {
          this.isGameOver = true;
        }
      },
    },
  },
});
</script>

<style lang="scss" scoped>
.memory {
  &__memory {
    margin-top: 2rem;
  }

  &__timer {
    margin: 2rem auto;
  }

  &__false-pairs-container {
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
