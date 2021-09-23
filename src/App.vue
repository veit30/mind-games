<template>
  <site-wrapper>
    <router-view />
  </site-wrapper>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SiteWrapper from "@/components/SiteWrapper.vue";

export default defineComponent({
  name: "App",

  components: {
    SiteWrapper,
  },
});
</script>

<style lang="scss">
#app {
  font-family: "Righteous", cursive;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
