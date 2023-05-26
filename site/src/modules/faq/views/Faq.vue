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
                <vl-column width="8" width-s="12">
                  <vl-grid mod-stacked>
                    <vl-column>
                      <vl-typography>
                        <y-markdown v-if="loaded" :src="content" />
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
                    <vl-side-navigation v-for="(topic, index) in tableOfContents.topics" :key="index" :title="topic.title">
                      <vl-side-navigation-list>
                        <template v-for="(question, indexQuestion) in topic.questions">
                          <vl-side-navigation-item
                            :key="indexQuestion"
                            :href="getUrl(topic.title, question.file)"
                            :text="question.title"
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
import { TranslationClient, Faq } from "@/services/translations-client";
import i18n from "@/services/i18n";
export default Vue.extend({
  props: {
    topic: {
      type: String,
      required: false,
    },
    question: {
      type: String,
      required: false,
    },
  },
  created() {
    const redirectUrl = this.$l("faq.redirect.url");
    if(redirectUrl) {
      this.$router.push(redirectUrl);
    }
    this.$emit("updateStatus", false);
  },
  async mounted() {
    this.loaded = false;
    this.header = await TranslationClient.getPageMarkdownHeader("nl", "faq");
    const valid = await this.validateAndLoadQuestion();
    this.loaded = true;
    this.$emit("updateStatus", true);
  },
  data() {
    return {
      loaded: false as boolean,
      header: "" as string,
      content: "" as string,
    };
  },
  computed: {
    sidebar(): { title: string; urls: { title: string; url: string }[] } | undefined {
      const items = this.$l("faq.sidebar");
      if (!items) return undefined;
      return items as { title: string; urls: { title: string; url: string }[] };
    },
    tableOfContents(): Faq.TableOfContents {
      return i18n.translations.faqTableOfContents;
    },
  },
  methods: {
    async validateAndLoadQuestion(): Promise<boolean> {
      if (!this.topic || !this.question) {
        return false;
      }
      const topic = this.tableOfContents.topics.find((t) => this.encodeTextAsUri(t.title) == this.topic);
      if (!topic) return false;
      const question = topic.questions.find((i) => this.encodeTextAsUri(i.file) == this.question);
      if (!question) return false;
      this.content = await TranslationClient.getFaqQuestionMarkdown("nl", question.file);
      return true;
    },
    encodeTextAsUri(str: string) {
      return encodeURI(str.replace(/\s+/g, "-").toLowerCase());
    },
    getUrl(topic: string, question: string) {
      return `/veelgestelde-vragen/${this.encodeTextAsUri(topic)}/${this.encodeTextAsUri(question)}}`;
    },
  },
});
</script>