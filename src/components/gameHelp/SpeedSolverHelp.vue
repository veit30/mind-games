<template>
  <div class="game-help">
    <section>
      <h2>How to play?</h2>
      <div>
        The goal of the game is to solve as many mathematical tasks in
        <i><strong>60</strong></i> seconds as possible. <br /><br />
        Two possible solution for each task will be shown at the buttom and can
        be comitted by pressing/clicking. Only one solution will be the right
        solution. The other one is alwasy wrong.
        <br /><br />
        <i>Good luck!</i>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "SpeedSolverHelp",
});
</script>
