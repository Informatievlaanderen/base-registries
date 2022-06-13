<template>
  <transition name="fade">
    <div v-show="loaded">
      <vl-header :prefix="meta.prefix" :title="meta.title"/>
      <vl-my-content-header :is-home-page="meta.isHomePage" :title="meta.title" :prefix="meta.prefix" />
      <router-view @updateStatus="updateStatus" @pageLoaded="pageLoaded"/>
      <vl-footer/>
    </div>
  </transition>
</template>

<script lang="ts">
import { Vue } from "vue-property-decorator";

export default Vue.extend({
  data() {
    return {
      loaded: false,
      meta: {
        isHomePage: false,
        title: "",
        prefix: ""
      } as any
    }
  },
  methods: {
    updateStatus(e: boolean): void {
      this.loaded = e;
    },
    pageLoaded(meta: any) {
      this.meta = meta;
    }
  }
});
</script>

<style lang="scss">
@import "./scss/theme.scss";
</style>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.125s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>