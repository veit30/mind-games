<template>
  <game-wrapper
    title="Quick Tapper"
    name="QuickTapper"
    :is-game-over="isGameOver"
    :counter="restartCounter"
    :score-time="scoreTime"
    :action-buttons="actionButtons"
    :instruction="currentInstruction"
    @tap="tapped"
    @precountdown-over="start"
    @restart="restart"
  >
    <template #default>
      <div class="square--large" :class="currentColorClass"></div>
    </template>
  </game-wrapper>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import GameWrapper from "@/components/GameWrapper.vue";
import type { ActionButtonOptions } from "@/data/types";
import Timer from "@/data/Timer";
import { randomInt } from "mathjs";
import { randomFromArray, shuffleArray } from "@/helper/util";

const actionButtons: ActionButtonOptions[] = [
  {
    name: "tap",
    alternative: "space",
    code: "Space",
    label: "Tap",
    clickEvent: {
      event: "tap",
    },
    isFullSize: true,
  },
];

export default defineComponent({
  name: "QuickTapper",

  components: {
    GameWrapper,
  },

  data() {
    return {
      actionButtons,
      isGameOver: true,
      restartCounter: 0,
      timer: new Timer(),
      actionSecond: 0,
      colors: ["blue", "red", "yellow", "orange", "white", "violet", "green"],
      nonActionColors: [] as string[],
      actionColor: "",
      lastTimerSecond: 0,
      scoreTime: 0,
    };
  },

  computed: {
    currentInstruction(): string {
      return `Tap when you see <span class="color--${this.actionColor}">${this.actionColor}</span>`;
    },
    currentColorClass(): string {
      return `background--${this.currentColor}`;
    },
    currentColor(): string {
      if (this.lastTimerSecond >= this.actionSecond) {
        return this.actionColor;
      } else {
        return randomFromArray(this.nonActionColors);
      }
    },
  },

  methods: {
    restart(): void {
      this.restartCounter += 1;
      this.isGameOver = false;
      this.timer.reset();
      this.actionSecond = randomInt(2, 12);
      this.nonActionColors = shuffleArray(this.colors).slice();
      this.actionColor = this.nonActionColors.pop() as string;
      this.lastTimerSecond = 0;
      this.scoreTime = 0;
    },
    endGame(): void {
      this.isGameOver = true;
    },
    start(): void {
      this.timer.start();
    },
    tapped(): void {
      this.timer.stop();
      this.scoreTime = (this.timer.value - this.actionSecond * 1000) / 1000;
      this.isGameOver = true;
    },
  },
  watch: {
    timer: {
      deep: true,
      handler(newVal) {
        if (newVal.seconds > this.lastTimerSecond) {
          this.lastTimerSecond = newVal.seconds;
        }
        if (newVal.seconds > this.actionSecond) {
          this.isGameOver = true;
        }
      },
    },
  },
});
</script>

<style lang="scss" scoped>
.square--large {
  width: 16rem;
  height: 16rem;
  margin: 2rem auto;
}
</style>
