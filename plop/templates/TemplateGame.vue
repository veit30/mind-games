<template>
  <game-wrapper
    title="GAME_TITLE"
    name="TemplateGame"
    :is-game-over="isGameOver"
    :counter="restartCounter"
    :score-elements="scoreElements"
    :action-buttons="currentActionButtons"
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
import { ScoreElement } from "@/data/types";

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
    };
  },

  computed: {
    currentActionButtons(): ActionButtonOptions[] {
      return [];
    },
    scoreElements(): ScoreElement[] {
      let score = 0;
      let scoreElements: ScoreElement[] = [];
      return scoreElements;
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
  },
});
</script>

<style lang="scss" scoped>
.template-game {
}
</style>
