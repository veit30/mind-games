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
    <template #top> </template>

    <template #default> </template>

    <template #bottom> </template>
  </game-wrapper>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import GameWrapper from "@/components/GameWrapper.vue";
import type { ActionButtonOptions } from "@/data/types";
import GameMatrix from "@/data/GameMatrix";

const actionButtons: ActionButtonOptions[] = [];

export default defineComponent({
  name: "Memory",

  components: {
    GameWrapper,
  },

  data() {
    return {
      actionButtons,
      isGameOver: true,
      restartCounter: 0,
      memoryMatrix: new GameMatrix(),
    };
  },

  computed: {
    currentActionButtons(): ActionButtonOptions[] {
      return [];
    },
    gamePoints(): number {
      let points = 0;
      return points;
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
.memory {
}
</style>
