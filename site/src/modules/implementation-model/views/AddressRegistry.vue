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
                    <y-markdown v-if="$data.markdownLoaded" :src="$data.implementationModelContent" />
                  </vl-typography>
                </vl-column>
              </vl-grid>
            </vl-column>
            <vl-column width="3" push="1" push-m="reset" width-s="12">
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
        </vl-layout>
      </vl-region>
    </vl-main>
  </vl-page>
</template>


<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  localeName: "implementationmodelAddressRegistry",
  implementationModelRegistry: "adressenregister",
  hasMarkdown: false,
});
</script>