<template>
  <div class="home">
    <h2 class="home__header">Game Selection</h2>
    <div class="home__game-container">
      <game-card name="Speed Solver" @click="routeTo('speed-solver')" />
      <game-card name="Speed Solver" />
      <game-card name="Speed Solver" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import GameCard from "@/components/GameCard.vue";

export default defineComponent({
  name: "GameSelection",

  components: {
    GameCard,
  },

  methods: {
    routeTo(game: string) {
      this.$router.push(`/${game}`);
    },
  },
});
</script>

<style lang="scss">
.home {
  text-align: center;
  font-family: "Righteous", cursive;

  &__game-container {
    display: flex;
    width: 70%;
    margin: 0 auto;
    justify-content: space-between;
  }

  &__header {
    margin-top: 20px;
  }
}
</style>
