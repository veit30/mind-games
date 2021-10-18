<template>
  <div class="game-help">
    <section>
      <h2>How to play?</h2>
      <div>
        This game aims to train your short term memory. The goal is to memorize
        a pattern within <i><strong>a few</strong></i> seconds.
        <br />
        When the memorizing time is up the pattern will reset (<i>4</i> seconds)
        to an empty grid. Paste the pattern you memorized and lock the pattern
        by pressing the <i>Lock</i> button. <br /><br />
        The game is over when your locked pattern does not match the initial
        pattern.
        <br /><br />
        <i>Good luck, have fun!</i>
      </div>
    </section>
    <section>
      <h3>Points</h3>
      <div>
        Every correctly memorized pattern will add
        <span class="color--green">+1</span> point to the final score.
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "MemoryMatrixHelp",
});
</script>
