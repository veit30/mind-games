<template>
  <div class="game-card">
    {{name}}
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { Prop } from 'vue-property-decorator';

export default class GameCard extends Vue {
  @Prop({type: String}) name!: string;
}
</script>

<style lang="scss" scoped>

.game-card {

}

</style>
