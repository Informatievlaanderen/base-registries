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
                        <y-markdown v-if="loaded" :src="getContent" />
                      </vl-typography>
                    </vl-column>
                    <vl-column>
                      <vl-grid v-if="loaded">
                        <vl-column width="4" width-m="6" width-s="12" v-for="repo in repos" :key="repo.id">
                          <vl-spotlight
                            :title="repo.name"
                            :text="repo.description"
                            :to="repo.html_url"
                          />
                        </vl-column>
                      </vl-grid>
                    </vl-column>
                  </vl-grid>
                </vl-column>
                <vl-column v-if="sidebar.urls > 0" width="3" push="1" push-m="reset" width-s="12">
                  <aside v-vl-sticky="{ top: '120px', left: '0' }">
                    <vl-side-navigation :title="$l(`opensourceComponents.sidebar.title`)">
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

export default Vue.extend({
  created() {
    this.$emit("updateStatus", false);
  },
  async mounted() {
    this.loaded = false;
    this.repos = await TranslationClient.getGithubRepos("component") || [] as any[];
    this.header = await TranslationClient.getPageMarkdownHeader("nl", "opensource-components");
    this.content = await TranslationClient.getPageMarkdownContent("nl", "opensource-components");
    this.loaded = true;
    this.$emit("updateStatus", true);
  },
  data() {
    return {
      loaded: false as boolean,
      header: "" as string,
      content: "" as string,
      repos: [] as any[]
    };
  },
  computed: {
    sidebar(): { title: string; urls: {title:string, url:string}[] } | undefined {
      const items = this.$l("opensourceComponents.sidebar");
      if (!items) return undefined;
      return items as { title: string; urls: {title:string, url:string}[] };
    },
    count(): number {
      return this.repos.length;
    },
    getContent(): string {
      return this.content.replace("COUNT", this.count.toString());
    }
  },
});
</script>