<template>
  <div class="game-help">
    <section>
      <h2>How to play?</h2>
      <div>
        Solve as many equations whithin <i><strong>60</strong></i> seconds by
        picking the correct operator. <br /><br />
        <i>Good luck, have fun!</i>
      </div>
    </section>
    <section>
      <h3>Points</h3>
      <div>
        Each correctly picked operator will add
        <span class="color--green">+1</span> point to the final score.
        <br />
        Each wrongly picket operator will cost one point (<span
          class="color--red"
          >-1</span
        >).
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "PickTheOperatorHelp",
});
</script>
