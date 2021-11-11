<template>
  <div class="mind-games-header">
    <div class="header__container" @click="$router.push('/')">
      <h1 class="mind-games-header__headline">
        {{ mindScrambler.currentWord }}
      </h1>
      <div class="mind-games-header__headline-separator"></div>
      <h1 class="mind-games-header__headline">
        {{ gamesScrambler.currentWord }}
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
    this.startScramble();
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
.mind-games-header {
  @include themed() {
    background: t("bg");
    border-bottom: 1px solid t("border-theme");
    color: t("text");
  }
  width: 100%;
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
    animation: fadeInFromNone 1.5s ease;

    &-separator {
      width: 10px;
      display: inline-block;
    }
  }
}

.header__container {
  cursor: pointer;
}

.mind-games-header.invisible {
  display: none;
}

@keyframes fadeInFromNone {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}
</style>
