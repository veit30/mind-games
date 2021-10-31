<template>
  <svg viewBox="0 0 100 100" :width="`${size}rem`" :height="`${size}rem`">
    <use :href="href"></use>
  </svg>
</template>

<script lang="ts">
import { IconName } from "@/data/types";
import { defineComponent, PropType } from "vue";

export default defineComponent({
  name: "SvgIcon",

  components: {},

  props: {
    icon: {
      type: String as PropType<IconName>,
      required: true,
    },
    size: {
      default: 2,
      type: Number,
    },
  },

  computed: {
    href() {
      return `${require("../assets/svg/symbols.svg")}#${this.icon}`;
    },
  },

  methods: {},
});
</script>

<style lang="scss" scoped></style>
