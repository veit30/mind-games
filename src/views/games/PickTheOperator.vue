<template>
  <game-wrapper
    title="Pick The Operator"
    name="PickTheOperator"
    :is-game-over="isGameOver"
    :counter="restartCounter"
    :points="gamePoints"
    :action-buttons="actionButtons"
    @commit-operator="commitOperator"
    @precountdown-over="start"
    @restart="restart"
  >
    <template #top>
      <countdown-bar
        class="pick-the-operator__countdown"
        :countdown="gameCountdown"
      />
    </template>

    <template #default>
      <p class="pick-the-operator__equation">
        {{ gameEquation.getWithoutOperator(0) }}
      </p>
    </template>

    <template #bottom>
      <div class="pick-the-operator__points-container">
        <game-info-point
          v-for="result in results"
          :key="result.id"
          :value="result.value"
        >
          {{ result.info }}
        </game-info-point>
      </div>
    </template>
  </game-wrapper>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import GameWrapper from "@/components/GameWrapper.vue";
import type { FlyOutActionButtonOptions, GameInfo } from "@/data/types";
import CountdownBar from "@/components/CountdownBar.vue";
import Countdown from "@/data/Countdown";
import Equation from "@/data/Equation";
import GameInfoPoint from "@/components/GameInfoPoint.vue";

const actionButtons: FlyOutActionButtonOptions[] = [
  {
    name: "operator1",
    alternative: "↑",
    code: "ArrowUp",
    label: "×",
    clickEvent: {
      event: "commit-operator",
      value: 0,
    },
    isFullSize: true,
    hasFlyOut: true,
    actionCounter: 0,
  },
  {
    name: "operator2",
    alternative: "←",
    code: "ArrowLeft",
    label: "-",
    clickEvent: {
      event: "commit-operator",
      value: 1,
    },
    isFullSize: false,
    hasFlyOut: true,
    actionCounter: 0,
  },
  {
    name: "operator3",
    alternative: "→",
    code: "ArrowRight",
    label: "+",
    clickEvent: {
      event: "commit-operator",
      value: 2,
    },
    isFullSize: false,
    hasExtraBorder: true,
    hasFlyOut: true,
    actionCounter: 0,
  },
];

export default defineComponent({
  name: "PickTheOperator",

  components: {
    GameWrapper,
    CountdownBar,
    GameInfoPoint,
  },

  data() {
    return {
      actionButtons,
      isGameOver: true,
      restartCounter: 0,
      gameCountdown: new Countdown(60) as Countdown,
      gameEquation: new Equation(),
      results: [] as GameInfo[],
    };
  },

  computed: {
    gamePoints(): number {
      let points = 0;
      this.results.forEach((res) => {
        points += res.value ? 1 : -1;
      });
      return points;
    },
  },

  methods: {
    restart(): void {
      this.restartCounter += 1;
      this.isGameOver = false;
      this.gameCountdown.reset();
      this.results = [];
    },

    start() {
      this.gameCountdown.start();
      this.nextEquation();
    },

    nextEquation() {
      this.gameEquation.new();
    },

    endGame(): void {
      this.isGameOver = true;
    },

    commitOperator(index: number) {
      if (this.isGameOver) return;
      this.results.push({
        id: this.results.length,
        info: this.gameEquation.getWithReplacedOperator(
          this.actionButtons[index].label,
          0
        ),
        value: this.gameEquation.hasOperatorAtIndex(
          this.actionButtons[index].label,
          0
        ),
      });
      if (this.actionButtons[index].actionCounter >= 0) {
        this.actionButtons[index].actionCounter += 1;
      } else {
        this.actionButtons[index].actionCounter = 0;
      }
      this.nextEquation();
    },
  },

  watch: {
    gameCountdown: {
      deep: true,
      handler(newVal) {
        if (newVal.isOver) {
          this.endGame();
        }
      },
    },
  },
});
</script>

<style lang="scss" scoped>
.pick-the-operator {
  &__countdown {
    margin: 2.5rem auto;
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

  &__equation {
    font-size: 4rem;
    text-align: center;
    margin-top: 6rem;
  }
}
</style>
