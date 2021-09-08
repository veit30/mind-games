<template>
  <div class="game-card" @click="$emit('click')">
    {{ name }}
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { Prop } from "vue-property-decorator";

export default class GameCard extends Vue {
  @Prop({ type: String }) name!: string;
}
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
