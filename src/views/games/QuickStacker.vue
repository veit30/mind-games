<template>
  <game-wrapper
    title="Quick Stacker"
    name="QuickStacker"
    :is-game-over="isGameOver"
    :counter="restartCounter"
    :score-time="userTime"
    :action-buttons="actionButtons"
    :instruction="currentInstruction"
    @unstack="unstack"
    @precountdown-over="start"
    @restart="restart"
  >
    <div class="stack">
      <div
        v-for="stackElement in stackElements"
        :key="stackElement.id"
        class="stack-element"
        :class="`background--${stackElement.color}`"
      ></div>
    </div>
  </game-wrapper>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import GameWrapper from "@/components/GameWrapper.vue";
import type { ActionButtonOptions, GameColor } from "@/data/types";
import Timer from "@/data/Timer";
import { randomFromArray, shuffleArray } from "@/helper/util";

const actionButtons: ActionButtonOptions[] = [
  {
    name: "color_blue",
    alternative: "↑",
    code: "ArrowUp",
    label: "",
    clickEvent: {
      event: "unstack",
      value: "blue",
    },
    backgroundColor: "blue",
    isFullSize: true,
  },
  {
    name: "color_red",
    alternative: "←",
    code: "ArrowLeft",
    label: "",
    clickEvent: {
      event: "unstack",
      value: "red",
    },
    isFullSize: false,
    backgroundColor: "red",
  },
  {
    name: "color_green",
    alternative: "→",
    code: "ArrowRight",
    label: "",
    clickEvent: {
      event: "unstack",
      value: "green",
    },
    isFullSize: false,
    hasExtraBorder: true,
    backgroundColor: "green",
  },
  {
    name: "color_yellow",
    alternative: "↓",
    code: "ArrowDown",
    label: "",
    clickEvent: {
      event: "unstack",
      value: "yellow",
    },
    isFullSize: true,
    backgroundColor: "yellow",
  },
];

type StackElement = {
  id: number;
  color: GameColor;
};

export default defineComponent({
  name: "QuickStacker",

  components: {
    GameWrapper,
  },

  data() {
    return {
      actionButtons,
      isGameOver: true,
      restartCounter: 0,
      stackElements: [] as StackElement[],
      timer: new Timer(),
      unstackedItems: 0,
      userTime: 0,
    };
  },

  computed: {
    currentInstruction(): string {
      if (this.stackElements[this.unstackedItems]?.color) {
        return `Press <span class="color--${
          this.stackElements[this.unstackedItems].color
        }">${this.stackElements[this.unstackedItems].color}</span>`;
      }
      return "";
    },
  },

  methods: {
    restart(): void {
      this.restartCounter += 1;
      this.timer.reset();
      this.unstackedItems = 0;
      this.isGameOver = false;
      this.userTime = 0;
      let usedColors = shuffleArray(["blue", "red", "green", "yellow"]).slice(
        0,
        4
      );
      this.stackElements = Array.from({ length: 10 }, (x, i) => {
        return {
          id: i,
          color: randomFromArray(usedColors),
        } as StackElement;
      });
    },
    start() {
      this.timer.start();
    },
    endGame(): void {
      this.isGameOver = true;
    },
    unstack(color: string) {
      if (this.stackElements[this.unstackedItems].color === color) {
        this.stackElements[this.unstackedItems].color = "empty";
        this.unstackedItems += 1;
      } else {
        this.userTime = -1;
        this.isGameOver = true;
      }
      if (this.unstackedItems > 9) {
        this.timer.stop();
        this.userTime = this.timer.value / 1000;
        this.isGameOver = true;
      }
    },
  },
});
</script>

<style lang="scss" scoped>
.stack {
  margin: 2rem auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.stack-element {
  width: 6rem;
  height: 2rem;
  margin: 0.25rem;
}
</style>
