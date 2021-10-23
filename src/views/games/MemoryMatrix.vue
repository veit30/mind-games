<template>
  <game-wrapper
    title="Memory Matrix"
    name="MemoryMatrix"
    :is-game-over="isGameOver"
    :counter="restartCounter"
    :score-elements="scoreElements"
    :action-buttons="currentActionButtons"
    @submit-matrix="submitMatrix"
    @precountdown-over="startMemorizeCountdown"
    @restart="restart"
  >
    <template #top>
      <div class="memory-matrix__top-spacing"></div>
    </template>

    <template #default>
      <p class="memory-matrix__instruction">{{ currentInstruction }}</p>
      <game-matrix-display
        class="memory-matrix__game-matrix"
        :matrix="currentMatrix"
        :spaced-items="true"
        :max-width="maxMatrixDisplayWidth"
        @item-click="handleItemClick"
      />
      <countdown-bar
        v-if="gamePhase < 1"
        class="memory-matrix__countdown"
        :countdown="memorizeCountdown"
        :is-small="true"
      />
    </template>
  </game-wrapper>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import GameWrapper from "@/components/GameWrapper.vue";
import type { ActionButtonOptions } from "@/data/types";
import GameMatrixDisplay from "@/components/GameMatrixDisplay.vue";
import GameMatrix from "@/data/GameMatrix";
import Countdown from "@/data/Countdown";
import CountdownBar from "@/components/CountdownBar.vue";
import { ScoreElement } from "@/data/types";

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
  name: "MemoryMatrix",

  components: {
    GameWrapper,
    GameMatrixDisplay,
    CountdownBar,
  },

  data() {
    return {
      actionButtons,
      isGameOver: true,
      gamePhase: 0,
      restartCounter: 0,
      round: 0,
      matrixWidth: 2,
      matrixHeight: 2,
      gameMatrix: new GameMatrix(),
      userMatrix: new GameMatrix(),
      fakeMatrix: new GameMatrix(),
      memorizeCountdown: new Countdown(3),
      interCountdown: new Countdown(1),
      instructions: [
        "Memorize the pattern",
        "Resetting grid...",
        "Paste the previous pattern",
      ],
    };
  },

  computed: {
    maxMatrixDisplayWidth(): number {
      if (this.matrixWidth < 5) {
        return 15;
      } else if (this.matrixWidth >= 5 && this.matrixWidth < 7) {
        return 20;
      } else {
        return 25;
      }
    },
    currentActionButtons(): ActionButtonOptions[] {
      if (this.gamePhase === 2) {
        return this.actionButtons;
      }
      return [];
    },
    scoreElements(): ScoreElement[] {
      return [
        {
          id: 0,
          info: "Finished rounds",
          value: this.round,
        },
      ];
    },
    currentMatrix(): GameMatrix {
      if (this.gamePhase === 0) {
        return this.gameMatrix;
      } else if (this.gamePhase === 1) {
        return this.fakeMatrix;
      } else {
        return this.userMatrix;
      }
    },
    currentInstruction(): string {
      return this.instructions[this.gamePhase];
    },
  },

  methods: {
    restart(): void {
      this.restartCounter += 1;
      this.round = 0;
      this.matrixWidth = 3;
      this.matrixHeight = 3;
      this.isGameOver = false;
      this.newMatrix();
    },
    startMemorizeCountdown() {
      this.memorizeCountdown.reset();
      this.memorizeCountdown.start();
      this.gamePhase = 0;
    },
    endGame(): void {
      this.isGameOver = true;
    },
    newMatrix() {
      this.gameMatrix = new GameMatrix();
      this.gameMatrix.generateItems(this.matrixWidth, this.matrixHeight, false);
      this.gameMatrix.changeItemValue(this.matrixWidth, true);
      this.gameMatrix.shuffle();

      this.userMatrix = new GameMatrix();
      this.userMatrix.generateItems(
        this.matrixWidth,
        this.matrixHeight,
        false,
        true
      );
    },
    nextRound() {
      this.round += 1;
      this.gamePhase = 0;
      if (this.round % 5 === 0) {
        this.matrixWidth += 1;
      }
      if (this.round % 10 === 0) {
        this.matrixHeight += 1;
      }
      this.newMatrix();
      this.startMemorizeCountdown();
    },
    submitMatrix() {
      if (this.gameMatrix.compareTo(this.userMatrix)) {
        this.nextRound();
      } else {
        this.endGame();
      }
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
        case "Space":
          event.preventDefault();
          this.submitMatrix();
          break;
      }
    },
    handleItemClick(id: number) {
      let item = this.userMatrix.get(id);

      if (item && item.type === "boolean") {
        item.value = !item.value;
      }
    },
  },
  watch: {
    memorizeCountdown: {
      deep: true,
      handler(newVal) {
        if (newVal.isOver) {
          this.gamePhase = 1;
          this.interCountdown.length = this.matrixHeight;
          this.interCountdown.start();
        }
      },
    },
    interCountdown: {
      deep: true,
      handler(newVal) {
        if (newVal.value) {
          this.fakeMatrix.generateItems(
            this.matrixWidth,
            this.matrixHeight,
            false
          );
          this.fakeMatrix.changeItemValue(
            this.matrixWidth * newVal.value,
            true
          );
        }
        if (newVal.isOver) {
          this.gamePhase = 2;
        }
      },
    },
  },
});
</script>

<style lang="scss" scoped>
.memory-matrix {
  &__top-spacing {
    height: 4rem;
  }

  &__countdown {
    margin-top: 3rem;
  }

  &__instruction {
    text-align: center;
    margin-top: 2.5rem;
    margin-bottom: 2rem;
    font-size: 1.5rem;
  }
}
</style>
