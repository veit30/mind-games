<template>
  <div class="game-help">
    <section>
      <h2>How to play?</h2>
      <div>
        As the name suggests you need to sum up all numbers in the squares. You
        will have <i><strong>90</strong></i> to solve as many as such tasks as
        you can.
        <br />
        <i
          >Be aware some number might be negative, which means you need to
          consider subtraction.</i
        >
        <br /><br />
        Pick the right solution from the buttons at the bottom.
        <br /><br />
        <i>Good luck, have fun!</i>
      </div>
    </section>
    <section>
      <h3>Points</h3>
      <div>
        A 2x2 square of numbers will add <span class="color--green">+1</span> if
        solved correctly. Larger squares like 3x3 will add
        <span class="color--green">+2</span> or 5x5
        <span class="color--green">+4</span> and so on. <br /><br />
        If the square contains a negative number (e.g. "-2") you will gain
        <span class="color--green">+1</span> extra point if solved correctly.
        <br />
        Larger squares (3x3 and above) will cost
        <i class="color--red">minus points</i> if not solved correctly.
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "SumItUpHelp",
});
</script>
