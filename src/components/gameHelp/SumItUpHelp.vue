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
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "SumItUpHelp",
});
</script>
