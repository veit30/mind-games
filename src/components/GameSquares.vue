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
      maxWidth: 15,
      itemMargin: 0.125,
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
      return `width: ${this.itemWidth}rem; height: ${
        this.itemWidth
      }rem; margin: ${this.itemMargin}rem; font-size: ${
        this.itemWidth / 2
      }rem;`;
    },
    containerStyle() {
      return `width: ${this.maxWidth}rem;`;
    },
    itemColorClass() {
      return "background--empty";
    },
  },

  watch: {
    items(newVal) {
      if (newVal.length >= 25) {
        this.maxWidth = 13;
      } else {
        this.maxWidth = 15;
      }
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
