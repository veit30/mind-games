<template>
  <div class="game-help">
    <section>
      <h2>How to play?</h2>
      <div>
        Count down the numbers starting by <strong>49</strong> (<i
          >by clicking on them!</i
        >). <br /><br />
        <i>Good luck, have fun!</i>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "CountDownHelp",
});
</script>
