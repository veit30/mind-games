<template>
  <div class="highscore-display">
    <p class="best">Best</p>
    <p v-if="hasHighscore" :class="extraPointsClasses">
      {{ currentHighscore }}<span v-if="isTimeScore">s</span>
    </p>
    <p v-else>-</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import getScoreColorClass from "@/helper/scoreColorClass";

export default defineComponent({
  name: "HighscoreDisplay",

  components: {},

  data() {
    return {};
  },

  props: {
    gameName: {
      type: String,
      default: "",
    },
  },

  computed: {
    currentHighscore() {
      return this.$store.getters.getHighscoreByGameName(this.gameName);
    },
    hasHighscore() {
      return this.$store.getters.hasHighscore(this.gameName);
    },
    extraPointsClasses() {
      return getScoreColorClass(this.currentHighscore, this.gameName);
    },
    isTimeScore() {
      return (
        this.$store.getters.getScoreTypeByGameName(this.gameName) === "time"
      );
    },
  },

  methods: {},
});
</script>

<style lang="scss" scoped>
.highscore-display {
  padding: 0.5rem 0.75rem;

  .best {
    @include themed() {
      color: t("text-secondary");
    }
    font-size: 1rem;
  }

  p {
    margin: 0;
    font-size: 1.5rem;
  }
}
</style>
