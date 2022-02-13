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
        return "disabled";
      }
      if (this.timer.seconds > this.threshold) {
        return "color--red";
      } else if (
        this.timer.seconds > this.threshold * 0.85 &&
        this.timer.seconds <= this.threshold
      ) {
        return "color--orange";
      }
      return "";
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
  @include themed() {
    border: 1px solid t("border");
    color: t("text");
  }
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.05), 0 3px 6px rgba(0, 0, 0, 0.1);
  height: 2.5rem;
  width: 6rem;
  z-index: 5;
  text-align: center;
  position: relative;
  white-space: nowrap;
  overflow: hidden;

  &__value {
    position: absolute;
    font-size: 1rem;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    margin: 0;
  }

  &.disabled {
    @include themed() {
      color: t("text-disabled");
    }
  }
}
</style>
