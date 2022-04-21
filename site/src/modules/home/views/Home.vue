<template>
  <vl-page>
    <vl-main>
      <vl-region>
        <vl-layout>
          <vl-hero-navigation :active-index="1">
            <vl-hero-navigation-item
              v-for="item in navigationItems" 
              :key="item.url"
              :title="item.title"
              :link-text="item.text"
              :background="item.background"
              :href="item.url">
              {{ item.subtitle }}
            </vl-hero-navigation-item>
          </vl-hero-navigation>
        </vl-layout>
      </vl-region>

      <vl-region>
        <vl-layout>
          <vl-grid mod-stack>
            <vl-column v-for="item in spotlightItems" width="4" width-s="12" :key="item.url">
                <vl-spotlight
                  mod-small
                  :title="item.title"
                  :subtitle="item.subtitle"
                  :to="item.url" />
            </vl-column>    
          </vl-grid>
        </vl-layout>
      </vl-region>

    </vl-main>
  </vl-page>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  mounted() {
    this.$emit("updateStatus", true);
  },
  computed: {
    navigationItems(): {title:string, subtitle:string, text:string, url:string, background:string}[] {
      const items = this.$l('home.navigationItems');
      return items as {title:string, subtitle:string, text:string, url:string, background:string}[];
    },
    spotlightItems(): {title:string, subtitle:string, url:string}[] {
      const items = this.$l('home.spotlightItems');
      return items as {title:string, subtitle:string, url:string}[];
    }
  }
});
</script>

<style lang="scss" scoped>
</style>