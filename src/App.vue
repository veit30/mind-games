<template>
  <site-wrapper>
    <router-view />
  </site-wrapper>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import SiteWrapper from "@/components/SiteWrapper.vue";

@Options({
  components: {
    SiteWrapper,
  },
})
export default class App extends Vue {}
</script>

<style lang="scss">
#app {
  font-family: "Righteous", cursive;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
