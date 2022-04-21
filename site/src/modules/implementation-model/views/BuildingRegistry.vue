<template>
  <vl-page class="implementation-model">
    <vl-main>
      <vl-region>
        <vl-layout>
          <vl-grid mod-stacked>
            <vl-column width="8" width-s="12">
              <vl-grid mod-stacked>
                <vl-column>
                  <vl-link
                    :to="$l('backButtons.implementationmodel.url')"
                    mod-bold
                    v-l="`backButtons.implementationmodel.text`"
                  />
                  <vl-typography>
                    <y-markdown v-if="loaded" :src="content" />
                  </vl-typography>
                </vl-column>
              </vl-grid>
            </vl-column>
            <vl-column width="3" push="1" push-m="reset" width-s="12">
              <aside v-vl-sticky="{ top: '120px', left: '0' }">
                <vl-side-navigation :title="$l(`implementationmodel.registries.sidebar.title`)">
                  <vl-side-navigation-list>
                    <template v-for="item in sidebar.urls">
                      <vl-side-navigation-item :key="item.url" :href="item.url" :text="item.title" />
                    </template>
                  </vl-side-navigation-list>
                </vl-side-navigation>
              </aside>
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
    this.content = await TranslationClient.getImplementationModelMarkdown("gebouwenregister");
    this.loaded = true;
    this.$emit("updateStatus", true);
  },
  data() {
    return {
      loaded: false as boolean,
      content: "" as string,
    };
  },
  computed: {
    sidebar(): { title: string; urls: { title: string; url: string }[] } | undefined {
      const items = this.$l("implementationmodel.registries.sidebar");
      if (!items) return undefined;
      return items as { title: string; urls: { title: string; url: string }[] };
    },
  },
});
</script>