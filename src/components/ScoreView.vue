<template>
  <div class="score-view">
    <p class="score-view__headline">Score</p>
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

export default defineComponent({
  name: "ScoreView",

  data() {
    return {
      gameScoreThresholds: [] as number[],
      scoreCountAnimation: new NumberCountAnimation(0, 0, 0),
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

    //TODO: implement in state
    // console.log(score);
    // let currentHighscore = localStorage.getItem(`${this.gameName}_highscore`);
    // console.log(currentHighscore);
    // if(!currentHighscore || parseInt(currentHighscore) < score)  {
    //   console.log("set score for " + this.gameName + ": " + score);
    //   localStorage.setItem(`${this.gameName}_highscore`, `${score}`);
    // }
  },

  computed: {
    scoreClass(): string {
      let thresholds = this.gameScoreThresholds;
      if (this.calculatedScore < thresholds[0]) {
        return "color--red";
      } else if (
        this.calculatedScore >= thresholds[0] &&
        this.calculatedScore < thresholds[1]
      ) {
        return "color--white";
      } else if (
        this.calculatedScore >= thresholds[1] &&
        this.calculatedScore < thresholds[2]
      ) {
        return "color--green";
      } else if (
        this.calculatedScore >= thresholds[2] &&
        this.calculatedScore < thresholds[3]
      ) {
        return "color--blue";
      } else if (this.calculatedScore >= thresholds[3]) {
        return "color--violet";
      } else {
        return "color--white";
      }
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
    &.flicker {
      animation: fadeInOut 0.7s linear infinite;
    }
  }
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
