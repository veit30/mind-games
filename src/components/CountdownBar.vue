<template>
  <div class="countdown-bar" :class="{ small: isSmall }">
    <div
      class="countdown-bar__content"
      :class="colorClass"
      :style="barWidthStyle"
    ></div>
    <p v-if="!isSmall" class="countdown-bar__value">{{ countdownText }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { roundDecimal } from "@/helper/util";
import Countdown from "@/data/Countdown";

export default defineComponent({
  name: "CountdownBar",

  props: {
    countdown: {
      type: Countdown,
      required: true,
    },
    isSmall: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    colorClass() {
      if (!this.countdown.isRunning) {
        return "";
      }
      let ratio =
        this.countdown.max > 0
          ? this.countdown.exactValue / this.countdown.max
          : 0;
      if (ratio >= 0.15) {
        return "background--green";
      } else if (ratio <= 0.05) {
        return "background--red";
      } else {
        return "background--orange";
      }
    },
    barWidthStyle() {
      let ratio =
        this.countdown.max > 0
          ? (this.countdown.exactValue / this.countdown.max) * 100
          : 100;
      ratio = roundDecimal(ratio, 2);
      return `width: ${100 - ratio}%`;
    },
    roundedCurrent() {
      return Math.ceil(this.countdown.exactValue);
    },
    countdownText() {
      return this.countdown.exactValue <= 0 ? "" : this.roundedCurrent;
    },
  },
});
</script>

<style lang="scss" scoped>
.countdown-bar {
  border: 1px solid $color-border-dark;
  height: 2rem;
  width: calc(100% - 6rem);
  z-index: 5;
  margin: 2rem auto;

  &.small {
    height: 0.5rem;
  }

  &__content {
    height: 100%;
    z-index: 4;
  }

  &__value {
    position: relative;
    display: flex;
    justify-content: center;
    font-size: 1rem;
    margin: 0;
    top: -1.5rem;
    color: $color-font;
  }
}

@media only screen and (min-width: 900px) {
  .countdown-bar {
    width: calc(100% - 10rem);
  }
}
</style>
