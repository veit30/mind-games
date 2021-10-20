<template>
  <div class="game-matrix-display" :style="containerStyle">
    <div
      v-for="item in matrix.items"
      :key="item.id"
      :style="styleByItem(item)"
      :class="classByItem(item)"
      class="game-matrix-display__item"
      @click="handleItemClick(item)"
    >
      <p>{{ itemDisplayValue(item) }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import GameMatrix, { GameMatrixItem } from "@/data/GameMatrix";
import Color from "@/data/Color";

export default defineComponent({
  name: "GameMatrixDisplay",

  data() {
    return {
      itemMargin: 0.125,
    };
  },

  props: {
    matrix: {
      type: Object as PropType<GameMatrix>,
      required: true,
    },
    spacedItems: {
      type: Boolean,
      default: false,
    },
    maxWidth: {
      type: Number,
      default: 15,
    },
    hasDisabledStyle: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    itemWidth() {
      let itemsPerRow = this.matrix.width;
      let margins = itemsPerRow * 2 * this.itemMargin;
      return parseFloat(((this.maxWidth - margins) / itemsPerRow).toFixed(4));
    },
    itemFontSize(): number {
      return parseFloat((this.itemWidth / 2).toFixed(4));
    },
    generalItemStyles() {
      return `width: ${this.itemWidth}rem; height: ${this.itemWidth}rem; margin: ${this.itemMargin}rem; font-size: ${this.itemFontSize}rem;`;
    },
    containerStyle() {
      return `width: ${this.maxWidth}rem;`;
    },
  },

  methods: {
    handleItemClick(item: GameMatrixItem) {
      if (item.isClickable) {
        this.$emit("item-click", item.id);
      }
    },
    styleByItem(item: GameMatrixItem) {
      let additionalStyles = "";
      if ((item.value + "").length > 2) {
        let fontSize = this.itemFontSize * 0.75;
        additionalStyles += `font-size: ${fontSize}rem; `;
      }
      if (item.type === "color" && (item.value as Color).value) {
        additionalStyles += `background: ${(item.value as Color).value}; `;
      }
      return `${this.generalItemStyles} ${additionalStyles}`;
    },
    classByItem(item: GameMatrixItem) {
      //TODO: prepare for color classes
      return {
        clickable: item.isClickable,
        disabled: !item.isClickable && this.hasDisabledStyle,
        selected: item.isSelected,
        "background--light": item.isActive,
      };
    },
    itemDisplayValue(item: GameMatrixItem) {
      if (item.isValueHidden) {
        return "";
      }
      return item.type === "string" || item.type === "number" ? item.value : "";
    },
  },
});
</script>

<style lang="scss" scoped>
.game-matrix-display {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  margin: 0 auto;

  &__item {
    border: 1px solid $color-border-dark;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: background 0.2s ease;

    &.clickable:hover {
      background: $grey-70;
    }

    &.disabled {
      background: $grey-40;
      color: $grey-70;
    }

    &.selected p {
      animation: bounce 2s ease infinite;
    }
  }
}

.background {
  &--white {
    background: $white;
  }

  &--green {
    background: $green;
  }

  &--orange {
    background: $orange;
  }

  &--red {
    background: $red;
  }

  &--light {
    &.clickable:hover {
      background: $grey-60;
    }
  }
}

@keyframes bounce {
  0% {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }

  40% {
    -webkit-transform: translate3d(0, -0.2rem, 0);
    transform: translate3d(0, -0.2rem, 0);
  }

  100% {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
}
</style>
