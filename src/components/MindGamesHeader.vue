<template>
  <div class="mind-games-header" :class="{ invisible: !isHome }">
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
    console.log(this.$route);
  },

  methods: {
    startScramble() {
      this.mindScrambler.start();
      this.gamesScrambler.start();
    },
  },

  computed: {
    isHome() {
      return this.$route.name === "Home";
    },
  },
});
</script>

<style lang="scss" scoped>
.mind-games-header {
  background: $color-background-darker;
  width: 100%;
  text-align: center;
  color: $color-font;
  padding: 2.375rem 0;
  user-select: none;
  display: flex;
  justify-content: center;

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

@keyframes fadeInFromNone {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}

@media only screen and (max-width: 500px) {
  .mind-games-header.invisible {
    display: none;
  }
}
</style>
