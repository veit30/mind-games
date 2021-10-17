<template>
  <div class="game-help">
    <section>
      <h2>How to play?</h2>
      <div>
        Count up the numbers starting by <strong>1</strong> (<i
          >by clicking on them!</i
        >). <br /><br />
        <i>Good luck, have fun!</i>
      </div>
    </section>
    <section>
      <h3>Points</h3>
      <div>
        The final score will be determined by the time you needed to count all
        numbers. When you count faster than the given time threshold of
        <strong><i>55</i></strong> seconds you will get a score of
        <span class="color--green">>55</span>. Every second you need longer than
        <strong><i>55</i></strong> seconds will decrease your score by
        <span class="color--red">-1</span>. <br /><br />
        Counting wrong (e.g. you count 2->3->5) will also cost
        <span class="color--red">-1</span> point.
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "CountUpHelp",
});
</script>
