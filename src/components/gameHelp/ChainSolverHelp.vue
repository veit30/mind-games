<template>
  <div class="game-help">
    <section>
      <h2>How to play?</h2>
      <div>
        This game is all about mental calculation. The goal is to compose
        mathematical tasks step by step and find out the right solution. Overall
        <i><strong>10</strong></i> tasks need to be calculated. The task length
        will increment over time. <br /><br />
        Be as quickly as possible because the time you need will have an impact
        on your points.
        <br /><br />
        Show the next part of the task by pressing <i>Next</i>. Once you reached
        the end of the task you can submit the correct solution by pressing one
        of the buttons at the bottom. <br /><br />
        <i>Good luck, have fun!</i>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "ChainSolverHelp",
});
</script>
