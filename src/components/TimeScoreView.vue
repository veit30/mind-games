<template>
  <div class="time-score-view">
    <p
      v-if="time > 0"
      class="time-score-view__time-headline"
      :class="{ flicker: newBestTime }"
    >
      {{ newBestTime ? "New best time" : "Time" }}
    </p>
    <p v-if="highscore && !newBestTime" class="time-score-view__highscore">
      Best time: <span>{{ highscore }}</span>
    </p>
    <p class="time-score-view__time" :class="[scoreClass, flickerClass]">
      {{ timeOrFailMessage }}
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { getTimeThresholds, getTimeFailMessage } from "@/data/games";
import { mapGetters } from "vuex";
import { getTimeScoreColorClass } from "@/helper/scoreColorClass";

export default defineComponent({
  name: "TimeScoreView",

  data() {
    return {
      gameTimeThresholds: [] as number[],
      failMessage: "" as string,
      newBestTime: false,
    };
  },

  props: {
    time: {
      type: Number,
      required: true,
    },
    gameName: {
      type: String,
      required: true,
    },
  },

  mounted() {
    this.gameTimeThresholds = getTimeThresholds(this.gameName);
    this.failMessage = getTimeFailMessage(this.gameName);

    let currentHighscore = parseFloat(this.highscore) || -1;
    if (currentHighscore < 0 || this.time < currentHighscore) {
      this.newBestTime = true;
      this.$store.dispatch("saveHighscore", this.time);
    }
  },

  computed: {
    ...mapGetters({ highscore: "getHighscore" }),
    scoreClass(): string {
      return getTimeScoreColorClass(this.time, this.gameTimeThresholds);
    },
    flickerClass(): string {
      if (this.time <= this.gameTimeThresholds[2] || this.time < 0) {
        return "flicker";
      }
      return "";
    },
    timeOrFailMessage(): number | string {
      return this.time > 0 ? this.time.toFixed(3) : this.failMessage;
    },
  },

  methods: {},
});
</script>

<style lang="scss" scoped>
.time-score-view {
  &__time-headline {
    font-size: 3rem;
    margin: 0;
  }

  &__time {
    font-weight: 600;
  }

  &__highscore {
    font-size: 1rem;
  }
}

.flicker {
  animation: fadeInOut 0.7s linear infinite;
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
</style>
