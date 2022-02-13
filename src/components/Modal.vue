<template>
  <div class="modal" @click="handleClick">
    <div class="modal__content">
      <div class="modal__headline">
        <div class="modal__headline-slot"></div>
        <h1>{{ currentHeadline }}</h1>
        <icon-button
          icon="close"
          :size="1.5"
          class="modal__close modal__headline-slot hover--red"
          @click="$emit('close')"
        />
      </div>
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import TextScrambler from "@/data/TextScrambler";
import { defineComponent } from "vue";
import IconButton from "@/components/IconButton.vue";

export default defineComponent({
  name: "Modal",

  components: {
    IconButton,
  },

  data() {
    return {
      headlineScrambler: new TextScrambler("", 1000),
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
    @include themed() {
      background: t("bg");
      border: 1px solid t("border-theme");
    }
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.05), 0 3px 6px rgba(0, 0, 0, 0.1);
    margin: 15% auto;
    padding: 20px;
    width: 95%;
    transition: height ease 1s;
  }

  &__close {
    text-align: end;
    position: relative;
    top: -2rem;
    right: -1rem;
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

.hover--red:hover,
.hover--red:focus {
  @include themed() {
    color: $red;
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
