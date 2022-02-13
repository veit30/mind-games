<template>
  <div class="mind-games-header" :class="transitionName">
    <div class="header__container">
      <h1 class="mind-games-header__headline">
        {{ !sessionStarted ? mindScrambler.currentWord : "MiNd" }}
      </h1>
      <div class="mind-games-header__headline-separator"></div>
      <h1 class="mind-games-header__headline">
        {{ !sessionStarted ? gamesScrambler.currentWord : "GAmES" }}
      </h1>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import TextScrambler from "@/data/TextScrambler";

export default defineComponent({
  name: "MindGamesHeader",

  data() {
    return {
      mindScrambler: new TextScrambler("MiNd", 5000),
      gamesScrambler: new TextScrambler("GAmES", 5000),
    };
  },
  mounted() {
    if (!this.sessionStarted) {
      this.startScramble();
    }
  },

  computed: {
    sessionStarted(): boolean {
      return this.$store.state.sessionStarted;
    },
    isHome(): boolean {
      return this.$route.name === "Home";
    },
    transitionName() {
      return this.$store.state.transitionName;
    },
  },

  methods: {
    startScramble() {
      this.mindScrambler.start();
      this.gamesScrambler.start();
    },
  },
});
</script>

<style lang="scss" scoped>
.home-to-game.mind-games-header {
  padding: 0;
  height: 0;
  animation: homeToGame 2s cubic-bezier(0.85, 0, 0.15, 1);
}

.game-to-home.mind-games-header {
  padding: 2.375rem 0;
  height: 8.5rem;
  animation: gameToHome 2s cubic-bezier(0.85, 0, 0.15, 1);
}

.initial.mind-games-header {
  animation: openUp 3s cubic-bezier(0.85, 0, 0.15, 1);
  &__headline {
    animation: fadeInFromNone 1.5s ease;
  }
}

.mind-games-header {
  @include themed() {
    background: t("bg");
    border-bottom: 1px solid t("border-theme");
    color: t("text");
  }
  transition: background 0.3s ease;
  z-index: 20;
  position: absolute;
  width: 100%;
  height: 8.5rem;
  text-align: center;
  padding: 2.375rem 0;
  user-select: none;
  display: flex;
  justify-content: center;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.05), 0 3px 6px rgba(0, 0, 0, 0.1);

  &__headline {
    font-family: $font-title;
    font-weight: 400;
    font-size: 3.3rem;
    margin: 0;
    display: inline-block;

    &-separator {
      width: 10px;
      display: inline-block;
    }
  }
}

.header__container {
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

@keyframes fadeInFromNone {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}

@keyframes homeToGame {
  0% {
    height: 8.5rem;
    padding: 2.375rem 0;
  }
  45% {
    height: 100vh;
    padding: 2.375rem 0;
  }

  55% {
    height: 100vh;
    padding: 2.375rem 0;
  }

  100% {
    height: 0;
    padding: 0;
  }
}

@keyframes gameToHome {
  0% {
    height: 0;
    padding: 0;
  }
  45% {
    height: 100vh;
    padding: 0;
  }

  55% {
    height: 100vh;
    padding: 0;
  }

  100% {
    height: 8.5rem;
    padding: 2.375rem 0;
  }
}
</style>
