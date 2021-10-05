<template>
  <div class="game-step-indicator" :class="stepColorClass"></div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import type { GameStep } from "@/data/types";
import { GAME_STATE } from "@/data/constants";

export default defineComponent({
  name: "GameSteps",

  props: {
    step: {
      type: Object as PropType<GameStep>,
      required: true,
    },
  },

  computed: {
    stepColorClass() {
      switch (this.step.state) {
        case GAME_STATE.DONE:
          return "background--green";
        case GAME_STATE.UNDECIDED:
          return "background--orange";
        case GAME_STATE.ERROR:
          return "background--red";
        default:
          return "background--empty";
      }
    },
  },
});
</script>

<style lang="scss" scoped>
.game-step-indicator {
  height: 0.25rem;
  margin: 0 0.5rem;
  flex-grow: 1;
}
</style>
