<template>
  <vl-page>
    <vl-region mod-no-space-bottom>
      <vl-layout>
        <header class="wp-pt-heading">
          <div class="wp-pt-heading__parent">
            <vl-link to="/release-notes/" mod-bold>Release notes</vl-link>
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

                <vl-column v-if="loaded" id="release-notes" width="12">
                  <vl-typography>
                    <vue-markdown :source="notes" :breaks="false" />
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

<style lang="scss">
  #release-notes .vl-typography h1 {
    font-size: 3.4rem;
    font-family: "Flanders Art Sans", sans-serif;
    font-weight: 500;
    margin-bottom: 2rem;
    line-height: 1.24;
  }

  #release-notes .vl-typography h2 {
    font-size: 2.6rem;
    font-family: "Flanders Art Sans", sans-serif;
    font-weight: 500;
    margin-bottom: 2rem;
    line-height: 1.3;

    padding-bottom: .3em;
    border-bottom: 1px solid #eaecef;
  }

  #release-notes .vl-typography h2:not(:first-child) {
    margin-top: 3rem;
  }

  #release-notes .vl-typography h3 {
    font-size: 2.2rem;
    font-family: "Flanders Art Sans", sans-serif;
    font-weight: 500;
    margin-bottom: 2rem;
    line-height: 1.36;
  }

  #release-notes .vl-typography h3:not(:first-child) {
    margin-top: 0;
  }

  #release-notes .vl-typography blockquote {
    padding: 0 1em;
    color: #6a737d;
    border-left: .25em solid #dfe2e5;

    position: static;
    font-size: 100%;
    font-weight: 400;
    line-height: 1;
  }

  #release-notes .vl-typography blockquote::before {
    display: none;
  }

  #release-notes .vl-typography a {
    color: #05c;
    text-decoration: none;
  }

  #release-notes .vl-typography a:hover {
    text-decoration: underline;
  }
</style>

<script>
import axios from 'axios';

function replaceAll(o, str1, str2, ignore) {
  // eslint-disable-next-line no-useless-escape
  return o.replace(new RegExp(str1.replace(/([\/\,\!\\\^\$\{\}\[\]\(\)\.\*\+\?\|\<\>\-\&])/g,'\\$&'),(ignore?'gi':'g')),(typeof(str2)=='string')?str2.replace(/\$/g,'$$$$'):str2);
}

export default {
  name: 'Note',

  data () {
    return {
      loaded: false,
      error: false,
      notes: '',
    };
  },

  mounted () {
    axios
      .get('https://raw.githubusercontent.com/wiki/Informatievlaanderen/registry-documentation/' + this.$route.params.note + '.md')
      .then(response => {
        this.notes = replaceAll(response.data, 'https://github.com/Informatievlaanderen/registry-documentation/wiki/', '/release-notes/');
        this.loaded = true;
      })
      .catch(error => {
        this.error = true;
        console.log('Could not get release notes.', error);
      });
  },
};
</script>
