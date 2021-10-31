<template>
  <div class="score-view">
    <p class="score-view__headline" :class="{ flicker: newHighscore }">
      {{ newHighscore ? "New Highscore" : "Score" }}
    </p>
    <p v-if="highscore && !newHighscore" class="score-view__highscore">
      Highscore: <span>{{ highscore }}</span>
    </p>
    <p class="score-view__score" :class="[scoreClass, flickerClass]">
      {{ calculatedScore }}
    </p>
    <div>
      <p
        v-for="scoreElement in filteredScoreElements"
        :key="scoreElement.id"
        class="score-view__score-element"
      >
        <span :class="[scoreElement.value > 0 ? 'color--green' : 'color--red']"
          >{{ scoreElement.value > 0 ? "+" : "" }}{{ scoreElement.value }}</span
        >
        {{ scoreElement.info }}
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import NumberCountAnimation from "@/data/NumberCountAnimation";
import { getScoreThresholds } from "@/data/games";
import type { ScoreElement } from "@/data/types";
import { mapGetters } from "vuex";
import { getIntScoreColorClass } from "@/helper/scoreColorClass";

export default defineComponent({
  name: "ScoreView",

  data() {
    return {
      gameScoreThresholds: [] as number[],
      scoreCountAnimation: new NumberCountAnimation(0, 0, 0),
      newHighscore: false,
    };
  },

  props: {
    gameName: {
      type: String,
      default: "",
    },
    scoreElements: {
      type: Array as PropType<ScoreElement[]>,
      default: () => [],
    },
  },

  mounted() {
    this.gameScoreThresholds = getScoreThresholds(this.gameName);
    let score = this.scoreElements.reduce((acc, cur) => {
      return acc + cur.value;
    }, 0);
    let time = this.filteredScoreElements.length * 1000;
    this.scoreCountAnimation = new NumberCountAnimation(0, score, time);
    this.scoreCountAnimation.start();

    if (score > (parseInt(this.highscore) || 0)) {
      this.newHighscore = true;
      this.$store.dispatch("saveHighscore", score);
    }
  },

  computed: {
    ...mapGetters({ highscore: "getHighscore" }),
    scoreClass(): string {
      return getIntScoreColorClass(
        this.calculatedScore,
        this.gameScoreThresholds
      );
    },
    calculatedScore() {
      return this.scoreCountAnimation.current;
    },
    filteredScoreElements() {
      return this.scoreElements.filter((e) => {
        return e.value !== 0;
      });
    },
    flickerClass(): string {
      if (
        this.scoreCountAnimation.current === this.scoreCountAnimation.to &&
        this.calculatedScore >= this.gameScoreThresholds[1]
      ) {
        return "flicker";
      }
      return "";
    },
  },
});
</script>

<style lang="scss" scoped>
.score-view {
  &__score-element {
    font-size: 1rem;
    margin: 0.25rem 0;
  }

  &__headline {
    font-size: 3rem;
    margin: 0;
  }

  &__score {
    font-weight: 600;
  }

  &__highscore {
    font-size: 1rem;
  }
}

.flicker {
  animation: fadeInOut 0.7s linear infinite;
}

@for $i from 1 through 10 {
  .score-view__score-element:nth-child(#{$i}n) {
    animation: wait #{$i * 0.5}s, fadeInDown ease 1s #{$i * 0.5}s 1;
  }
}

@keyframes fadeInOut {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
}

@keyframes fadeInDown {
  0% {
    opacity: 0;
    -webkit-transform: translate3d(0, -2rem, 0);
    transform: translate3d(0, -2rem, 0);
  }
  100% {
    opacity: 1;
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
}

@keyframes wait {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 0;
  }
}
</style>
