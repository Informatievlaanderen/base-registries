<template>
  <vl-page>
    <vl-main>
      <vl-region>
        <vl-layout>
          <vl-grid mod-stacked>
            <vl-column width="9" width-s="12">
              <vl-link :to="$l('backButtons.releaseNotes.url')" mod-bold v-l="`backButtons.releaseNotes.text`" />
              <header>
                <y-markdown v-if="$data.markdownLoaded" :src="$data.header" />
              </header>
            </vl-column>

            <vl-column>
              <vl-grid mod-stacked>
                <vl-column :width="`${$data.sidebar.urls > 0 ? 8 : 12}`" width-s="12">
                  <vl-grid mod-stacked>
                    <vl-column>
                      <vl-typography>
                        <y-markdown v-if="$data.markdownLoaded" :src="$data.content" />
                      </vl-typography>
                    </vl-column>
                    <vl-column v-for="item in $data.doormatItems" :key="item.url" width="6" width-s="12">
                      <vl-doormat :title="item.title" :href="item.url" mod-alt />
                    </vl-column>
                  </vl-grid>
                </vl-column>
                <vl-column v-if="$data.sidebar.urls > 0" width="3" push="1" push-m="reset" width-s="12">
                  <aside v-vl-sticky="{ top: '120px', left: '0' }">
                    <vl-side-navigation :title="$l(`${$options.localeName}.sidebar.title`)">
                      <vl-side-navigation-list>
                        <template v-for="item in $data.sidebar.urls">
                          <vl-side-navigation-item :key="item.url" :href="item.url" :text="item.title" />
                        </template>
                      </vl-side-navigation-list>
                    </vl-side-navigation>
                  </aside>
                </vl-column>
              </vl-grid>
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
  localeName: "release-notes/business-wr",
  hasMarkdown: true,
  async mounted() {
    this.loaded = false;
    this.loaded = true;
  },
  data() {
    return {
      loaded: false as boolean
    };
  },
});
</script>