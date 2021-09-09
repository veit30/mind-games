<template>
  <div class="speed-solver">
    <h2 class="speed-solver__headline">Speed Solver</h2>
    <div class="speed-solver__container">
      <countdown-bar class="speed-solver__countdown" />
      <div class="speed-solver__button-container margin-horizontal--large">
        <game-button
          class="speed-solver__upper-button"
          alternative="B"
          @click="this.$router.push('/')"
          >Back</game-button
        >
        <game-button
          class="speed-solver__upper-button"
          alternative="R"
          @click="restart"
          >Restart</game-button
        >
      </div>
      <div class="speed-solver__main-container">
        {{ equation }}
      </div>
      <div class="speed-solver__points-container">
        <game-info-point :value="true" />
        <game-info-point :value="true" />
        <game-info-point :value="true" />
        <game-info-point :value="true" />
        <game-info-point :value="true" />
        <game-info-point :value="true" />
      </div>
      <div class="speed-solver__button-container">
        <game-button
          class="speed-solver__action-button"
          alternative="←"
          @click="commitSolution(0)"
          :is-large="true"
          >{{ solutions[0] }}</game-button
        >
        <game-button
          class="speed-solver__action-button"
          alternative="→"
          @click="commitSolution(1)"
          :is-large="true"
          >{{ solutions[1] }}</game-button
        >
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import GameButton from "@/components/GameButton.vue";
import CountdownBar from "@/components/CountdownBar.vue";
import GameInfoPoint from "@/components/GameInfoPoint.vue";

export default defineComponent({
  name: "SpeedSolver",

  components: {
    GameButton,
    CountdownBar,
    GameInfoPoint,
  },

  data() {
    return {
      solutions: [0, 0] as Array<number>,
      equation: "1+1" as string,
    };
  },

  beforeMount() {
    document.addEventListener("keydown", this.handleKeyDown, false);
  },

  beforeUnmount() {
    document.removeEventListener("keydown", this.handleKeyDown, false);
  },

  methods: {
    handleKeyDown(event: KeyboardEvent) {
      switch (event.code) {
        case "KeyB":
          this.$router.push("/");
          break;
        case "KeyR":
          this.restart();
          break;
      }
    },

    restart() {
      console.log("restarted");
    },

    commitSolution(index: number) {},
  },
});
</script>

<style lang="scss" scoped>
.speed-solver {
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  user-select: none;

  &__main-container {
    margin-top: 155px;
    font-size: 60px;
    text-align: center;
  }

  &__upper-button {
    min-width: 100px;
  }

  &__action-button {
    width: 50%;
    height: 100px;
  }

  &__countdown {
    margin: 40px auto;
  }

  &__button-container {
    display: flex;
    justify-content: space-between;
  }

  &__points-container {
    margin-top: auto;
    margin-bottom: 20px;
    display: flex;
    justify-content: center;
  }

  &__container {
    border: 1px solid $c-border-dark;
    background: $c-background-dark;
    width: 550px;
    height: 750px;
    margin-top: 30px;
    display: flex;
    flex-direction: column;
  }
}

.margin-horizontal--large {
  margin-left: 80px;
  margin-right: 80px;
}
</style>
