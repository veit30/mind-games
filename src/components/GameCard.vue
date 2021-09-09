<template>
  <div class="game-card" @click="$emit('click')">
    {{ name }}
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "GameCard",

  props: {
    name: {
      type: String,
    },
  },
});
</script>

<style lang="scss" scoped>
.game-card {
  width: 425px;
  height: 245px;
  border: 1px solid $c-border-dark;
  background: $c-background-dark;

  &:hover {
    background: $c-background-darker;
    cursor: pointer;
  }
}
</style>
