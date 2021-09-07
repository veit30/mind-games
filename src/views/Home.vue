<template>
  <div class="home">
    Mind-Games
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import GameCard from '@/components/GameCard.vue';

@Options({
  components: {
    GameCard,
  },
})
export default class Home extends Vue {}
</script>
