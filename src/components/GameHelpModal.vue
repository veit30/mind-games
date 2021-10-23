<template>
  <modal headline="Help" @close="$emit('close')">
    <component :is="gameHelperComponent" />
    <div v-if="hasHighscore" class="button-container">
      <button class="hs-delete-button" @click="deleteHighscore">
        Delete highscore
      </button>
    </div>
  </modal>
</template>

<script lang="ts">
import { defineComponent, defineAsyncComponent } from "vue";
import { VNode } from "vue";
import { mapGetters, mapState } from "vuex";
import Modal from "@/components/Modal.vue";

export default defineComponent({
  name: "GameHelpModal",

  components: {
    Modal,
  },

  computed: {
    ...mapState(["game"]),
    ...mapGetters(["hasHighscore"]),
    gameHelperComponent(): VNode {
      return defineAsyncComponent(
        () => import(`@/components/gameHelp/${this.game}Help.vue`)
      );
    },
  },

  methods: {
    deleteHighscore() {
      this.$store.dispatch("removeHighscore");
    },
  },
});
</script>

<style lang="scss" scoped>
.button-container {
  text-align: start;
  button.hs-delete-button {
    outline: none;
    border: none;
    color: $white;
    background: $deep-black;
    cursor: pointer;
    font-family: $font-main;
    font-size: 0.8rem;
    margin-top: 2rem;
    padding: 0;

    &:hover {
      color: $red;
    }
  }
}
</style>
