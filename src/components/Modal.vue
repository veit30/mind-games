<template>
  <div class="modal" @click="handleClick">
    <div class="modal__content">
      <div class="modal__headline">
        <div class="modal__headline-slot"></div>
        <h1>{{ currentHeadline }}</h1>
        <div class="modal__close modal__headline-slot" @click="$emit('close')">
          close
        </div>
      </div>
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import WordScrambler from "@/data/WordScrambler";
import { defineComponent } from "vue";

export default defineComponent({
  name: "Modal",

  data() {
    return {
      headlineScrambler: new WordScrambler("", 1000),
    };
  },

  props: {
    headline: {
      type: String,
      default: "",
    },
  },

  mounted() {
    this.headlineScrambler.word = this.headline;
    this.headlineScrambler.start();
  },

  computed: {
    currentHeadline(): string {
      return this.headlineScrambler.currentWord;
    },
  },

  methods: {
    handleClick(event: Event) {
      if ((event.target as HTMLElement).className == "modal") {
        this.$emit("close");
      }
    },
  },
});
</script>

<style lang="scss" scoped>
.modal {
  position: fixed;
  z-index: 15;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: #000000;
  background-color: rgba(0, 0, 0, 0.4);

  &__content {
    background-color: $deep-black;
    margin: 15% auto;
    padding: 20px;
    width: 95%;
  }

  &__close {
    text-align: end;
    cursor: pointer;

    &:hover,
    &:focus {
      color: $grey-80;
    }
  }
  &__headline {
    display: flex;
    justify-content: space-between;
    h1 {
      font-size: 3rem;
    }
    &-slot {
      width: 10%;
    }
  }
}

//TODO: media queryies

@media only screen and (min-width: 900px) {
  .modal {
    &__content {
      margin: 10% auto;
      width: 55%;
    }
  }
}
</style>
