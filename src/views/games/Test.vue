<template>
  <div class="test-container">
    <div class="main">
      <play-button @click="click" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import PlayButton from "@/components/PlayButton.vue";

export default defineComponent({
  name: "Test",

  components: {
    PlayButton,
  },

  data() {
    return {};
  },

  // beforeMount() {
  //   document.addEventListener("keydown", this.handleKeyDown, false);
  // },

  // beforeUnmount() {
  //   document.removeEventListener("keydown", this.handleKeyDown, false);
  // },

  // mounted() {},

  // computed: {},

  methods: {
    click() {
      console.log("play");
    },
    // handleKeyDown(event: KeyboardEvent) {
    //   console.log(event.code);
    // },
  },
});
</script>

<style lang="scss" scoped>
.test-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;

  .main {
    background: $color-background-dark;
    border: 1px solid $color-border-dark;
    width: 80%;
    height: 80%;
  }
}
</style>
