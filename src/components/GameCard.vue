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
  width: 100%;
  height: 13.75rem;
  border: 1px solid $color-border-dark;
  background: $color-background-dark;
  text-decoration: none;
  color: $color-font;
  text-align: start;
  margin-bottom: 1rem;
  overflow: hidden;

  &:hover {
    background: $color-background-darker;
    cursor: pointer;
  }

  &__name {
    padding: 1.25rem 1.25rem 0 1.25rem;
    font-size: 1.5rem;
  }

  &__description {
    padding: 0.625rem 1.25rem;
    color: $color-font-dark;
    font-size: 0.825rem;
  }
}

@media only screen and (min-width: 700px) {
  .game-card {
    width: 31%;
  }
}
</style>
