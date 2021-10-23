<template>
  <div class="game-help">
    <section>
      <h2>How to play?</h2>
      <div>
        A classic memory.
        <br />
        Memorize the symbols and reveal similar symbols together to remove them
        from the board until the board is empty.
        <br /><br />
        A timer will track the time needed to clear the board.
        <br /><br />
        <i>Good luck, have fun!</i>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "MemoryHelp",
});
</script>
