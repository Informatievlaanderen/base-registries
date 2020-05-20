<template>
  <vl-page>
    <vl-region mod-no-space-bottom>
      <vl-layout>
        <header class="wp-pt-heading">
          <div class="wp-pt-heading__parent">
            <vl-link to="/" mod-bold>Overzicht</vl-link>
          </div>

          <div class="wp-pt-heading__title-wrapper">
            <vl-title tag-name="h1" class="wp-pt-heading__title">Release notes</vl-title>
          </div>

          <vl-grid>
            <vl-column width="9" width-s="12">
              <div class="wp-pt-heading__content">
                <vl-typography>
                  <vl-introduction>
                    Wat zit er zo allemaal in een <strong>release</strong>? Kom het hier te weten!
                  </vl-introduction>
                </vl-typography>
              </div>
            </vl-column>
          </vl-grid>
        </header>
      </vl-layout>
    </vl-region>

    <vl-main>
      <vl-region>
        <vl-layout>
          <vl-grid mod-stacked>
            <vl-column width="12">
              <vl-grid mod-stacked>
                <vl-column v-if="!loaded && !error" width="12">
                  <div v-vl-align:center>
                    <vl-loader message="De release notes worden opgevraagd" />
                  </div>
                </vl-column>

                <vl-column v-if="error" width="12">
                  <vl-alert
                    title="Release notes ophalen mislukt"
                    content="Er is iets fout gelopen tijdens het ophalen van de release notes. Probeer later opnieuw."
                    mod-error />
                </vl-column>

                <vl-column v-if="loaded" width="12">
                  <vl-title tag-name="h2">Welke releases zijn er allemaal?</vl-title>

                  <vl-typography>
                    <p>Momenteel zijn volgende releases gekend:</p>

                    <component :is="note"></component>
                  </vl-typography>
                </vl-column>
              </vl-grid>
            </vl-column>
          </vl-grid>
        </vl-layout>
      </vl-region>
    </vl-main>
  </vl-page>
</template>

<script>
import axios from 'axios';
import Mode from 'frontmatter-markdown-loader/mode';
import fm from 'frontmatter-markdown-loader?mode=meta';

export default {
  name: 'Notes',

  data () {
    return {
      loaded: false,
      error: false,
      note: {},
    };
  },

  mounted () {
    axios
      .get('https://raw.githubusercontent.com/wiki/Informatievlaanderen/registry-documentation/Release-Notes.md')
      .then(response => {
        var markdown = response
          .data
          .replace(
            /\[(.*)\]\(https:\/\/github\.com\/Informatievlaanderen\/registry-documentation\/wiki\/(.*)\)/gm,
            '<vl-link to ="/release-notes/$2">$1</vl-link>');

        var options = {
          query: {
            mode: [Mode.VUE_COMPONENT],
          },
        };
        var parsedMarkdown = fm.bind(options)(markdown);
        var noteObject = eval(parsedMarkdown);
        var noteComponent = eval(noteObject.vue.component);

        this.note = noteComponent;
        this.loaded = true;
      })
      .catch(error => {
        this.error = true;
        console.log('Could not get release notes.', error);
      });
  },
};
</script>
