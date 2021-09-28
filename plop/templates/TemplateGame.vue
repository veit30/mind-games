<template>
  <game-wrapper
    title="GAME_TITLE"
    :is-game-over="isGameOver"
    :counter="restartCounter"
    :points="gamePoints"
    :points-class="gamePointsClass"
    :actionButtons="currentActionButtons"
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
import type { ActionButtonOptions } from "@/data/types";

const actionButtons: ActionButtonOptions[] = [];

export default defineComponent({
  name: "TemplateGame",

  components: {
    GameWrapper,
  },

  data() {
    return {
      actionButtons,
      isGameOver: true,
      restartCounter: 0,
      version: "1.0.0",
    };
  },

  beforeMount() {
    document.addEventListener("keydown", this.handleKeyDown, false);
  },

  beforeUnmount() {
    document.removeEventListener("keydown", this.handleKeyDown, false);
  },

  computed: {
    currentActionButtons() {
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
      this.gameIsOver = true;
    },
    handleKeyDown(event: KeyboardEvent) {
      event.preventDefault();
      switch (event.code) {
        case "KeyB":
          this.$router.push("/");
          break;
        case "KeyR":
        case "KeyS":
          this.restart();
          break;
      }
    },
  },
});
</script>

<style lang="scss" scoped>
.template-game {
}
</style>
