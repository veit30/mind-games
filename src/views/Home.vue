<template>
  <div class="home">
    <div class="home__headline-container">
      <div class="headline-side-container"></div>
      <h2 class="home__headline">Game Selection</h2>
      <div class="headline-side-container">
        <icon-button
          icon="color-switch"
          hover-action="rotate-in"
          class="m1-right"
          @click="switchTheme"
        ></icon-button>
      </div>
    </div>
    <div class="home__game-container">
      <div class="home__games">
        <game-card v-for="game in games" :key="game.name" v-bind="game" />
        <div v-if="games.length % 3 === 2" class="home__game-placeholder"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import GameCard from "@/components/GameCard.vue";
import type { Game } from "@/data/games";
import IconButton from "@/components/IconButton.vue";

export default defineComponent({
  name: "GameSelection",

  components: {
    GameCard,
    IconButton,
  },

  mounted() {
    this.$store.commit("enteredRoute");
    this.$store.dispatch("getHighscores");
  },

  computed: {
    games(): Game[] {
      return this.$store.state.games;
    },
    theme() {
      return this.$store.state.theme;
    },
  },

  methods: {
    switchTheme() {
      if (this.theme === "dark") {
        this.$store.dispatch("setTheme", "light");
      } else {
        this.$store.dispatch("setTheme", "dark");
      }
    },
  },
});
</script>

<style lang="scss">
.home {
  @include themed() {
    color: t("text");
  }
  margin-top: 10rem;
  text-align: center;

  &__game-container {
    @include themed() {
      border: 1px solid t("border-theme");
      background: t("bg-secondary");
      border-top: 0px;
    }
    transition: background 0.3s ease;
    width: 90%;
    margin: 0 auto;
    padding: 1rem;
    height: calc(100vh - 18rem);
    overflow-y: scroll;
    overflow-x: hidden;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.05), 0 3px 6px rgba(0, 0, 0, 0.1);
  }

  &__games {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }

  &__headline {
    font-size: 2.25rem;
    padding: 1.25rem;
  }

  &__headline-container {
    @include themed() {
      border: 1px solid t("border-theme");
      background: t("bg");
      box-shadow: 0 3px 6px rgba(0, 0, 0, 0.05), 0 3px 6px rgba(0, 0, 0, 0.1);
    }
    transition: background 0.3s ease;
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-left: 5%;
    margin-right: 5%;
    margin-top: 2.5rem;
    z-index: 10;
  }
}

.home__game-placeholder {
  width: 31%;
}

.headline-side-container {
  display: flex;
  width: 10%;
  justify-content: flex-end;
}

@media only screen and (max-width: 395px) {
  .home {
    &__game-container {
      height: calc(100vh - 24rem);
    }
  }
}

@media only screen and (min-width: 900px) {
  .home {
    &__game-container {
      width: 70%;
    }

    &__headline-container {
      margin-left: 15%;
      margin-right: 15%;
    }
  }
}
</style>
