<template>
  <div class="template-view"></div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "TemplateView",

  components: {},

  data() {
    return {};
  },

  props: {},

  beforeMount() {
    document.addEventListener("keydown", this.handleKeyDown, false);
  },

  beforeUnmount() {
    document.removeEventListener("keydown", this.handleKeyDown, false);
  },

  computed: {},

  methods: {},
});
</script>

<style lang="scss" scoped>
.template-view {
}
</style>
