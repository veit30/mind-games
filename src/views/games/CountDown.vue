<template>
  <game-wrapper
    title="Count Down"
    name="CountDown"
    :is-game-over="isGameOver"
    :counter="restartCounter"
    :score-elements="scoreElements"
    :has-no-pre-countdown="true"
    @precountdown-over="newRound"
    @restart="restart"
  >
    <template #top>
      <timer-box
        class="count-down__timer"
        :timer="gameTimer"
        :threshold="gameTimeThreshold"
      />
    </template>

    <template #default>
      <p class="count-down__instruction">Count from 49 to 1</p>
      <game-matrix-display
        class="count-down__matrix"
        :matrix="gameMatrix"
        :has-disabled-style="true"
        :max-width="matrixDisplayWidth"
        @item-click="confirmNumber"
      />
    </template>

    <template #bottom>
      <div class="count-down__false-count-container">
        <game-info-point
          v-for="point in falseCounts"
          :key="point.id"
          :value="false"
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
import GameMatrix from "@/data/GameMatrix";
import GameMatrixDisplay from "@/components/GameMatrixDisplay.vue";
import TimerBox from "@/components/TimerBox.vue";
import Timer from "@/data/Timer";
import GameInfoPoint from "@/components/GameInfoPoint.vue";
import { ScoreElement } from "@/data/types";

type FalseCountInfo = { id: number; info: string };

export default defineComponent({
  name: "CountDown",

  components: {
    GameWrapper,
    GameMatrixDisplay,
    TimerBox,
    GameInfoPoint,
  },

  data() {
    return {
      isGameOver: true,
      restartCounter: 0,
      gameMatrix: new GameMatrix(),
      gameTimer: new Timer(),
      gameTimeThreshold: 55,
      falseCounts: [] as FalseCountInfo[],
      numbersConfirmed: 0,
    };
  },

  computed: {
    scoreElements(): ScoreElement[] {
      let timerValue = this.gameTimer.seconds;
      return [
        {
          id: 0,
          info: "Game clear",
          value: this.gameTimeThreshold,
        },
        {
          id: 1,
          info: "Time penalty",
          value: -(timerValue - this.gameTimeThreshold),
        },
        {
          id: 2,
          info: "False counts",
          value: this.falseCounts.length,
        },
      ];
    },
    matrixDisplayWidth(): number {
      //TODO: change once differen matrix sizes supported
      return 23;
    },
  },

  methods: {
    restart(): void {
      this.restartCounter += 1;
      this.isGameOver = false;
      this.gameTimer.reset();
      this.falseCounts = [];
      this.numbersConfirmed = 0;
    },
    endGame(): void {
      this.isGameOver = true;
      this.gameTimer.stop();
    },
    newRound() {
      this.gameMatrix.generateNumberMatrix(7, 7, true);
      this.gameMatrix.shuffle();
    },
    confirmNumber(id: number) {
      if (this.gameTimer.isStopped && this.numbersConfirmed === 0) {
        this.gameTimer.start();
      }
      if (48 - id === this.numbersConfirmed) {
        let item = this.gameMatrix.get(id);
        if (item) {
          item.isClickable = false;
        }
        this.numbersConfirmed += 1;
      } else {
        this.falseCounts.push({
          id: this.falseCounts.length,
          info: `Wrong: ${50 - this.numbersConfirmed} -> ${id + 1}`,
        });
      }
      if (this.numbersConfirmed === this.gameMatrix.size) {
        this.endGame();
      }
    },
  },
});
</script>

<style lang="scss" scoped>
.count-down {
  &__matrix {
    margin-top: 2rem;
  }

  &__timer {
    margin: 2rem auto;
  }
  &__false-count-container {
    margin-top: auto;
    margin-bottom: 20px;
    margin-right: 30px;
    margin-left: 30px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
  &__instruction {
    text-align: center;
    margin-top: 2.5rem;
    margin-bottom: 2rem;
    font-size: 1.5rem;
  }
}
</style>
