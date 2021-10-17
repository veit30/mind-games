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
    <section>
      <h3>Points</h3>
      <div>
        Each correctly solved task will add
        <span class="color--green">+1</span> point to the final score. There
        will be no minus points for wrongly solved tasks. <br /><br />
        When you solved more than 6 tasks correctly you can gain up to
        <strong>5</strong> extra points dependent on the time you needed to
        solve the tasks. By staying below the threshold of
        <i><strong>115</strong></i> seconds you will earn the full
        <span class="color--green">+5</span> extra points. Every
        <i><strong>10</strong></i> seconds you took longer will cost
        <span class="color--red">-1</span> extra points. <br /><br />
        <i>You can not get minus extra points.</i>
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
