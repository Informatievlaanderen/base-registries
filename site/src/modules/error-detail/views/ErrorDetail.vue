<template>
  <vl-page>
    <vl-main>
      <vl-region>
        <vl-layout>
          <vl-grid mod-stacked>
            <vl-column width="9" width-s="12">
              <vl-link :to="$l('backButtons.home.url')" mod-bold v-l="`backButtons.home.text`" />
              <header>
                <y-markdown v-if="loaded" :src="`# Foutmeldingen`" />
              </header>
            </vl-column>

            <vl-column>
              <vl-grid v-if="id" mod-stacked>
                <vl-column width="8" width-s="12">
                  <vl-grid mod-stacked>
                    <vl-column>
                      <vl-typography>
                        <y-markdown v-if="loaded" :src="$data.content" />
                        <y-markdown v-if="(loaded && isKnownError)" :src="getExampleJson" />
                      </vl-typography>
                    </vl-column>
                    <vl-column>
                      <vl-grid v-if="loaded">
                        <vl-column width="4" width-m="6" width-s="12"> </vl-column>
                      </vl-grid>
                    </vl-column>
                  </vl-grid>
                </vl-column>
                <vl-column width="3" push="1" push-m="reset" width-s="12">
                  <aside v-vl-sticky="{ top: '120px', left: '0' }">
                    <vl-side-navigation title="Andere foutmeldingen">
                      <vl-side-navigation-list v-for="(error, index) in tableOfContents.knownErrors" :key="index" :title="error.title">
                        <template>
                          <vl-side-navigation-item
                            :key="index"
                            :href="getUrl(error.id)"
                            :text="error.title"
                          />
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
import { TranslationClient, ErrorDetail } from "../../../services/translations-client";
import { PublicApiClient } from "../../../services/public-api-client";
import i18n from "@/services/i18n";

export default Vue.extend({
  localeName: "errorDetail",
  props: {
    id: {
      type: String,
      required: false,
    },
  },
  async mounted() {
    this.loaded = false;
    const valid = await this.validateAndLoadKnownError();  
    this.loaded = true;
    this.$emit("updateStatus", true);
  },
  computed: {
    isKnownError(): Boolean {
      return !!this.id;
    },
    tableOfContents(): ErrorDetail.TableOfContents {
      return i18n.translations.errorDetailTableOfContents;
    },
    getExampleJson(): string {
      return "### Json Payload\n```json\n" + JSON.stringify(this.example, null, 2) + "\n```";
    }
  },
  data() {
    return {
      loaded: false as boolean,
      githubMarkdown: "" as string,
      example: "" as string
    };
  },
  methods: {
    async validateAndLoadKnownError(): Promise<boolean> {
      if (!this.id) {
        return false;
      }

      const error = this.tableOfContents.knownErrors.find((t) => this.encodeTextAsUri(t.id) == this.id);

      if (!error) {
        // Unknown error
        const errorDetail = JSON.parse(await PublicApiClient.getErrorDetail(this.id) || "")
        this.$data.content = `## Error ${errorDetail.status}\n ### ${errorDetail.title}\n ${errorDetail.detail}\n`;
        this.example = JSON.parse(await PublicApiClient.getErrorDetail(this.id) || "");
        return false;
      };

      this.$data.content = await TranslationClient.getErrorDetailKnownErrorMarkdown("nl", error.id) || "";
      this.example  = await TranslationClient.getErrorDetailKnownErrorExample("nl", error.id) || "";
      
      return true;
    },
    encodeTextAsUri(str: string) {
      return encodeURI(str.replace(/\s+/g, "-").toLowerCase());
    },
    getUrl(id: string) {
      return `/foutmeldingen/${this.encodeTextAsUri(id)}`;
    },
  }
});
</script>