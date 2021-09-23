<template>
  <div class="countdown-bar">
    <div
      class="countdown-bar__content"
      :class="colorClass"
      :style="barWidthStyle"
    ></div>
    <p class="countdown-bar__value">{{ countdownText }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { roundDecimal } from "@/helpers/util";
import Countdown from "@/data/Countdown";

export default defineComponent({
  name: "CountdownBar",

  props: {
    countdown: {
      type: Countdown,
      required: true,
    },
  },

  computed: {
    colorClass() {
      let ratio =
        this.countdown.max > 0
          ? this.countdown.exactValue / this.countdown.max
          : 0;
      if (ratio >= 0.15) {
        return "green";
      } else if (ratio <= 0.05) {
        return "red";
      } else {
        return "orange";
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
      return Math.floor(this.countdown.exactValue);
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
  height: 30px;
  width: 400px;
  z-index: 5;
  color: #fff;

  &__content {
    height: 100%;
    // width: 80%;
    z-index: 4;

    &.green {
      background: $green;
    }

    &.orange {
      background: $orange;
    }

    &.red {
      background: $red;
    }
  }

  &__value {
    margin: 0;
    position: relative;
    top: -24px;
    left: 190px;
    color: $color-font;
  }
}
</style>
