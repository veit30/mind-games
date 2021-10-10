<template>
  <div class="home">
    <div class="home__headline-container">
      <h2 class="home__headline">Game Selection</h2>
    </div>
    <div class="home__game-container">
      <game-card v-for="game in games" :key="game.name" v-bind="game" />
      <div v-if="games.length % 3 === 2" class="home__game-placeholder"></div>
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

  &__game-container {
    display: flex;
    width: 70%;
    margin: 0 auto;
    padding: 1rem;
    justify-content: space-between;
    flex-wrap: wrap;
    height: calc(100vh - 18rem);
    overflow-y: scroll;
    border: 1px solid $color-border-dark;
    border-top: 0px;
    background: $color-background-dark;
  }

  &__headline {
    font-size: 2.25rem;
    padding: 1.25rem;
  }

  &__headline-container {
    margin-left: 15%;
    margin-right: 15%;
    margin-top: 2.5rem;
    text-align: center;
    border: 1px solid $color-border-dark;
    background: $color-background-dark;
  }
}

.home__game-placeholder {
  width: 31%;
}

@media only screen and (max-width: 395px) {
  .home {
    &__game-container {
      height: calc(100vh - 20rem);
    }
  }
}
</style>
