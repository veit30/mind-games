<template>
  <modal headline="Help" @close="$emit('close')">
    <component :is="gameHelperComponent" />
    <transition name="fadeaway">
      <div v-if="hasHighscore" class="button-container">
        <p class="highscore">
          Best:
          <span :class="extraPointsClasses"
            >{{ this.currentHighscore }}<span v-if="isTimeScore">s</span></span
          >
        </p>
        <button class="hs-delete-button" @click="deleteHighscore">
          <svg-icon icon="trash" :size="0.8" class="m02-right" />
          <span>Delete highscore</span>
        </button>
      </div>
    </transition>
  </modal>
</template>

<script lang="ts">
import { defineComponent, defineAsyncComponent } from "vue";
import { VNode } from "vue";
import { mapState } from "vuex";
import Modal from "@/components/Modal.vue";
import SvgIcon from "@/components/SvgIcon.vue";
import getScoreColorClass from "@/helper/scoreColorClass";

export default defineComponent({
  name: "GameHelpModal",

  components: {
    Modal,
    SvgIcon,
  },

  computed: {
    ...mapState(["game"]),
    hasHighscore(): boolean {
      return this.$store.getters.hasHighscore(this.game);
    },
    gameHelperComponent(): VNode {
      return defineAsyncComponent(
        () => import(`@/components/gameHelp/${this.game}Help.vue`)
      );
    },
    currentHighscore(): string {
      return this.$store.getters.getHighscoreByGameName(this.game);
    },
    extraPointsClasses(): string {
      return getScoreColorClass(this.currentHighscore, this.game);
    },
    isTimeScore(): boolean {
      return this.$store.getters.getScoreTypeByGameName(this.game) === "time";
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

  .highscore {
    font-size: 1rem;
    margin-top: 1.5rem;
    margin-bottom: 0.5rem;
  }

  button.hs-delete-button {
    @include themed() {
      color: t("text");
    }
    display: flex;
    align-items: center;
    outline: none;
    border: none;
    background: transparent;
    cursor: pointer;
    font-family: $font-main;
    font-size: 0.8rem;
    // margin-top: 2rem;
    padding: 0;
    transition: all ease 0.2s;

    &:hover {
      color: $red;
    }
  }
}

.fadeaway-enter-active,
.fadeaway-leave-active {
  max-height: 4rem;
  overflow: hidden;
  transition: all 0.5s ease-in-out;
}
.fadeaway-enter,
.fadeaway-leave-to {
  max-height: 0px;
  opacity: 0;
}
</style>
