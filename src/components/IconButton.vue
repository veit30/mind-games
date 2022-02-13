<template>
  <button class="icon-button" :class="hoverAction">
    <svg-icon :icon="icon" :size="size" />
  </button>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SvgIcon from "@/components/SvgIcon.vue";

export default defineComponent({
  name: "IconButton",

  components: { SvgIcon },

  props: {
    size: {
      type: Number,
      defualt: 2,
    },
    icon: {
      type: String,
      required: true,
    },
    hoverAction: {
      type: String,
      default: "",
    },
  },
});
</script>

<style lang="scss" scoped></style>
