<template>
  <vl-page>
    <vl-main>
      <vl-region>
        <vl-layout>
          <vl-grid mod-stacked>
            <vl-column width="9" width-s="12">
              <vl-link :to="$l('backButtons.home.url')" mod-bold v-l="`backButtons.home.text`" />
              <header>
                <y-markdown v-if="loaded" :src="header" />
              </header>
            </vl-column>

            <vl-column>
              <vl-grid mod-stacked>
                <vl-column :width="`${sidebar.urls > 0 ? 8 : 12}`" width-s="12">
                  <vl-grid mod-stacked>
                    <vl-column>
                      <vl-typography>
                        <y-markdown v-if="loaded" :src="content" />
                      </vl-typography>
                    </vl-column>
                    <vl-column>
                      <vl-grid v-if="loaded">
                        <template v-for="item in getComponents">
                          <vl-column v-if="isEnabled(item)" width="4" width-s="12" :key="item">
                            <div class="pa-3">
                              <vl-info-tile tag-name="div" :title="$l(`versions.${item}.title`)" mod-highlight>
                                <template slot="subtitle">
                                  <div>
                                    <p>Versie: <strong>{{ versions.components[item] }}</strong></p>
                                    <vl-annotation v-l="`versions.${item}.description`" />
                                  </div>
                                </template>
                                <vl-badge icon= "tag-check" slot="badge" />
                              </vl-info-tile>
                            </div>
                          </vl-column>
                        </template>
                      </vl-grid>
                    </vl-column>
                  </vl-grid>
                </vl-column>
                <vl-column v-if="sidebar.urls > 0" :width="3" push="1" push-m="reset" width-s="12">
                  <aside v-vl-sticky="{ top: '120px', left: '0' }">
                    <vl-side-navigation :title="$l(`versions.sidebar.title`)">
                      <vl-side-navigation-list>
                        <template v-for="item in sidebar.urls">
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
import { TranslationClient } from "../../../services/translations-client";
import { PublicApiClient } from "../../../services/public-api-client";

export default Vue.extend({
  created() {
    this.$emit("updateStatus", false);
  },
  async mounted() {
    this.loaded = false;
    this.header = await TranslationClient.getPageMarkdownHeader("nl", "versions");
    this.content = await TranslationClient.getPageMarkdownContent("nl", "versions");
    this.versions = await PublicApiClient.getVersionsOfRegistries();
    this.loaded = true;
    this.$emit("updateStatus", true);
  },
  data() {
    return {
      loaded: false as boolean,
      header: "" as string,
      content: "" as string,
      versions: "" as any,
    };
  },
  computed: {
    sidebar(): { title: string; urls: { title: string; url: string }[] } | undefined {
      const items = this.$l("versions.sidebar.urls");
      if (!items) return undefined;
      return items as { title: string; urls: { title: string; url: string }[] };
    },
    getComponents(): string[] {
      const components = Object.keys(this.versions && this.versions.components) as string[];
      return components;
    },
  },
  methods: {
    
    isEnabled(componentName: string): boolean {
      const enabled: boolean = this.$l(`versions.${componentName}.enable`);
      return enabled;
    }
  }
});
</script>

<style lang="scss" scoped>
.pa-3 {
  padding: 0.3em;
}
</style>