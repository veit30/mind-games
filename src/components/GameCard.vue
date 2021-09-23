<template>
  <router-link class="game-card" :to="route">
    <div class="game-card__name">
      {{ name }}
    </div>
    <div class="game-card__description">
      {{ description }}
    </div>
  </router-link>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "GameCard",

  props: {
    name: {
      type: String,
    },
    description: {
      type: String,
    },
    route: {
      type: String,
    },
    symbol: {
      type: String,
    },
  },
});
</script>

<style lang="scss" scoped>
.game-card {
  width: 31%;
  height: 220px;
  border: 1px solid $color-border-dark;
  background: $color-background-dark;
  text-decoration: none;
  color: $color-font;
  text-align: start;
  margin-bottom: 40px;

  &:hover {
    background: $color-background-darker;
    cursor: pointer;
  }

  &__name {
    margin: 20px 0 10px 20px;
    font-size: 28px;
  }

  &__description {
    margin: 10px 0 0 20px;
    color: $color-font-dark;
    font-size: 16px;
  }
}
</style>
