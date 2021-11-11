<template>
  <button class="play-button">
    <svg-icon :icon="ICONS.PLAY" />
  </button>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SvgIcon from "@/components/SvgIcon.vue";
import { ICONS } from "@/data/constants";

export default defineComponent({
  name: "PlayButton",

  data() {
    return {
      ICONS,
    };
  },

  components: {
    SvgIcon,
  },

  methods: {},
});
</script>

<style lang="scss" scoped>
.play-button {
  @include themed() {
    color: t("text");
  }
  min-width: 3rem;
  min-height: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background: none;
  outline: none;
  border: none;

  svg {
    transform: scale(0.9);
    animation: growAndShrink 2s ease-in-out infinite;
  }

  &:hover svg {
    @include themed() {
      color: t("text-hover");
    }
    animation-play-state: paused;
    cursor: pointer;
  }
}

@keyframes growAndShrink {
  0% {
    transform: scale(0.9);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(0.9);
  }
}
</style>
