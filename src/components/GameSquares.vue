<template>
  <div class="game-squares" :style="containerStyle">
    <div
      v-for="item in items"
      :key="item.key"
      class="game-squares__item"
      :style="itemStyle"
      :class="itemColorClass"
    >
      {{ typeof item.value !== "boolean" ? item.value : "" }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import type { SquareItem } from "@/data/types";

export default defineComponent({
  name: "GameSquares",

  components: {},

  data() {
    return {
      maxWidth: 268,
      itemMargin: 2,
    };
  },

  props: {
    items: {
      type: Array as PropType<SquareItem[]>,
      required: true,
    },
  },

  computed: {
    itemWidth() {
      let itemsPerRow = Math.ceil(Math.sqrt(this.items.length));
      let margins = itemsPerRow * 2 * this.itemMargin;
      return Math.floor((this.maxWidth - margins) / itemsPerRow);
    },
    itemStyle() {
      return `width: ${this.itemWidth}px; height: ${
        this.itemWidth
      }px; margin: ${this.itemMargin}px; font-size: ${Math.floor(
        this.itemWidth / 2
      )}px;`;
    },
    containerStyle() {
      return `width: ${this.maxWidth}px;`;
    },
    itemColorClass() {
      return "background--empty";
    },
  },

  methods: {},
});
</script>

<style lang="scss" scoped>
.game-squares {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  margin: 0 auto;

  &__item {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
