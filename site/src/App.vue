<template>
  <transition name="fade">
    <div v-show="loaded">
      <vl-header/>
      <router-view @updateStatus="updateStatus" />
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
    }
  },
  methods: {
    updateStatus(e: boolean): void {
      this.loaded = e;
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