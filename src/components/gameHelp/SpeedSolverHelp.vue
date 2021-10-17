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
    <section>
      <h3>Points</h3>
      <div>
        Each correctly solved task will add
        <span class="color--green">+1</span> point to the final score.
        <br />
        Each wrongly solved task will cost one point (<span class="color--red"
          >-1</span
        >).
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
