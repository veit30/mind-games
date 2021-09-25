<template>
  <div class="timer-box">
    <p class="timer-box__value" :class="colorClass">{{ time }}</p>
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
      if (this.timer.isStopped) {
        return "color--grey";
      }
      if (this.timer.seconds > this.threshold) {
        return "color--red";
      } else if (
        this.timer.seconds > this.threshold * 0.85 &&
        this.timer.seconds <= this.threshold
      ) {
        return "color--orange";
      }
      return "color--white";
    },
    time() {
      return this.timer.time;
    },
    value() {
      return this.timer.value;
    },
    seconds() {
      return this.timer.seconds;
    },
    minutes() {
      return this.timer.minutes;
    },
  },
});
</script>

<style lang="scss" scoped>
.timer-box {
  border: 1px solid $color-border-dark;
  height: 40px;
  width: 65px;
  z-index: 5;
  text-align: center;
  position: relative;
  white-space: nowrap;
  overflow: hidden;

  &__value {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    margin: 0;
  }
}
</style>
