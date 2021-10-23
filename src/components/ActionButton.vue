<template>
  <div class="action-button" :class="colorClass">
    <game-button
      :alternative="alternative"
      :is-large="isLarge"
      :is-borderless="isBorderless"
    >
      {{ label }}
    </game-button>
    <div
      v-for="f in flyOuts"
      :key="f.key"
      class="action-button__flyout"
      :class="flyOutClass"
    >
      {{ f.value }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import GameButton from "@/components/GameButton.vue";
import { GameColor } from "@/data/types";

export default defineComponent({
  name: "ActionButton",

  components: {
    GameButton,
  },

  data() {
    return {
      flyOuts: [] as { key: number; value: string }[],
      lastLabel: "",
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
    actionCounter: {
      type: Number,
      default: 0,
    },
    backgroundColor: {
      type: String as PropType<GameColor>,
      default: "",
    },
  },

  computed: {
    colorClass() {
      return {
        "background--red": this.backgroundColor === "red",
        "background--green": this.backgroundColor === "green",
        "background--blue": this.backgroundColor === "blue",
        "background--yellow": this.backgroundColor === "yellow",
      };
    },
    flyOutClass() {
      return {
        "action-button__flyout--large":
          this.isLarge && this.alternative.length <= 2,
        "action-button__flyout--large-small-alt":
          this.isLarge && this.alternative.length > 2,
      };
    },
  },

  methods: {
    handleClick() {
      console.log(this.label);
    },
  },

  watch: {
    label(newVal, oldVal) {
      if (oldVal) this.lastLabel = oldVal;
    },
    actionCounter(newVal) {
      this.flyOuts.push({
        key: newVal,
        value: this.lastLabel,
      });
      if (this.flyOuts.length > 10) {
        this.flyOuts = this.flyOuts.slice(-10);
      }
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
    animation: fadeOutUp 0.5s ease-in both;

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

  &.background--blue {
    background: $blue;

    button.game-button {
      background: $blue;
    }
  }

  &.background--blue:hover {
    background: $blue--hover;

    button.game-button {
      background: $blue--hover;
    }
  }

  &.background--red {
    background: $red;

    button.game-button {
      background: $red;
    }
  }

  &.background--red:hover {
    background: $red--hover;

    button.game-button {
      background: $red--hover;
    }
  }

  &.background--yellow {
    background: $yellow;

    button.game-button {
      background: $yellow;
    }
  }

  &.background--yellow:hover {
    background: $yellow--hover;

    button.game-button {
      background: $yellow--hover;
    }
  }

  &.background--green {
    background: $green;

    button.game-button {
      background: $green;
    }
  }

  &.background--green:hover {
    background: $green--hover;

    button.game-button {
      background: $green--hover;
    }
  }
}

@keyframes fadeOutUp {
  0% {
    opacity: 1;
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
  100% {
    opacity: 0;
    -webkit-transform: translate3d(0, -3.5rem, 0);
    transform: translate3d(0, -3.5rem, 0);
  }
}
</style>
