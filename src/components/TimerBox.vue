<template>
  <div class="timer-box">
    <p class="timer-box__value" :class="colorClass">{{ value }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Timer from "@/data/Timer";

export default defineComponent({
  name: "TimerBox",

  props: {
    timer: {
      type: Timer,
      required: true,
    },
    threshold: {
      type: Number,
      default: 1000,
    },
  },

  computed: {
    colorClass() {
      if (this.timer.value > this.threshold) {
        return "color--red";
      } else if (
        this.timer.value > this.threshold * 0.85 &&
        this.timer.value <= this.threshold
      ) {
        return "color--orange";
      }
      return "";
    },
    value() {
      return this.timer.time;
    },
  },
});
</script>

<style lang="scss" scoped>
.timer-box {
  border: 1px solid $color-border-dark;
  height: 30px;
  width: 50px;
  z-index: 5;
  text-align: center;
  position: relative;

  &__value {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    margin: 0;
    color: $color-font;
  }
}
</style>
