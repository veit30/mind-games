<template>
  <div class="home">
    <h2 class="home__header">Game Selection</h2>
    <div class="home__game-container">
      <game-card v-for="game in games" :key="game.name" v-bind="game" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import GameCard from "@/components/GameCard.vue";
import games from "@/data/games";

export default defineComponent({
  name: "GameSelection",

  data() {
    return {
      games,
    };
  },

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
    margin-top: 30px;
    justify-content: space-between;
    flex-wrap: wrap;
  }

  &__header {
    font-size: 36px;
    margin-top: 40px;
    margin-left: 15%;
    text-align: start;
  }
}
</style>
