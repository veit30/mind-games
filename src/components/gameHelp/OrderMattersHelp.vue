<template>
  <div class="game-help">
    <section>
      <h2>How to play?</h2>
      <div>
        Memorize the order of appearence of the highlighted squares. In the
        second step click the squares in the order you memorized before.
        <br /><br />
        <i>Good luck, have fun!</i>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "OrderMattersHelp",
});
</script>
