<template>
  <vl-page>
    <vl-main>
      <vl-layout>
        <vl-region>
          <vl-grid mod-stacked>
            <vl-column :width="`${$data.sidebar.urls > 0 ? 8 : 12}`" width-s="12">
              <vl-grid mod-stacked v-if="$data.markdownLoaded">
                <vl-column
                  width="4"
                  width-m="6"
                  width-s="12"
                  v-for="item in $data.spotlightItems"
                  :key="item.url"
                >
                  <vl-spotlight :title="item.title" :subtitle="item.subtitle" :text="item.text" :to="item.url" />
                </vl-column>
                <vl-column>
                  <vl-typography class="mt-12">
                    <y-markdown :src="$data.content" />
                  </vl-typography>
                </vl-column>
              </vl-grid>
            </vl-column>
            <vl-column v-if="$data.sidebar.urls > 0" width="3" push="1" push-m="reset" width-s="12">
              <aside v-vl-sticky="{ top: '120px', left: '0' }">
                <vl-side-navigation :title="$l(`home.sidebar.title`)">
                  <vl-side-navigation-list>
                    <template v-for="item in $data.sidebar.urls">
                      <vl-side-navigation-item :key="item.url" :href="item.url" :text="item.title" />
                    </template>
                  </vl-side-navigation-list>
                </vl-side-navigation>
              </aside>
            </vl-column>
          </vl-grid>
        </vl-region>
      </vl-layout>
    </vl-main>
  </vl-page>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  localeName: "home",
  hasMarkdown: true,
});
</script>

<style lang="scss" scoped>
</style>