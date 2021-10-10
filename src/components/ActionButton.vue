<template>
  <div class="action-button">
    <game-button
      :alternative="alternative"
      :is-large="isLarge"
      :is-borderless="isBorderless"
    >
      {{ label }}
    </game-button>
    <div v-if="showFlyOut" class="action-button__flyout" :class="flyOutClass">
      {{ lastLabel }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import GameButton from "@/components/GameButton.vue";

export default defineComponent({
  name: "ActionButton",

  components: {
    GameButton,
  },

  data() {
    return {
      flyOutText: "Flyout",
      lastLabel: "",
      flyOutTriggered: false,
      flyOutTimeout: 0,
    };
  },

  props: {
    label: {
      type: String,
    },
    alternative: {
      type: String,
      default: "",
    },
    isLarge: {
      type: Boolean,
    },
    isBorderless: {
      type: Boolean,
    },
    hasFlyOut: {
      type: Boolean,
    },
    flyOutTrigger: {
      type: Number,
    },
  },

  computed: {
    flyOutClass() {
      return {
        "action-button__flyout--large":
          this.isLarge && this.alternative.length <= 2,
        "action-button__flyout--large-small-alt":
          this.isLarge && this.alternative.length > 2,
      };
    },
    showFlyOut() {
      return this.hasFlyOut && this.flyOutTriggered;
    },
  },

  methods: {},

  watch: {
    label(newVal, oldVal) {
      if (oldVal) this.lastLabel = oldVal;
    },
    flyOutTrigger() {
      clearTimeout(this.flyOutTimeout);
      this.flyOutTimeout = 0;
      this.flyOutTriggered = true;
      this.flyOutTimeout = setTimeout(() => {
        this.flyOutTriggered = false;
      }, 500);
    },
  },
});
</script>

<style lang="scss" scoped>
.action-button {
  display: flex;
  flex-direction: column;
  align-items: center;

  &__flyout {
    font-size: 2rem;
    position: relative;
    height: 0px;
    top: -4.5rem;
    animation: fadeIn 0.5s ease-in both;

    &.action-button__flyout--large {
      font-size: 2rem;
      position: relative;
      top: -4.75rem;
    }

    &.action-button__flyout--large-small-alt {
      font-size: 2rem;
      position: relative;
      top: -4.25rem;
    }
  }
}

@keyframes fadeIn {
  from {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
  to {
    opacity: 0;
    transform: translate3d(0, -3.5rem, 0);
  }
}
</style>