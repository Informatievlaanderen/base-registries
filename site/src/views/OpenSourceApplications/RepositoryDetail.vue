<template>
  <vl-page>
    <vl-region mod-no-space-bottom>
      <vl-layout>
        <header class="wp-pt-heading">
          <div class="wp-pt-heading__parent">
            <vl-link to="/opensource-applicaties/" mod-bold>Opensource applicaties</vl-link>
          </div>

          <div class="wp-pt-heading__title-wrapper">
            <vl-title tag-name="h1" class="wp-pt-heading__title">Opensource applicaties</vl-title>
          </div>

          <vl-grid>
            <vl-column width="9" width-s="12">
              <div class="wp-pt-heading__content">
                <vl-typography>
                  <vl-introduction>
                    Wat zit er zo allemaal in de opensource applicatie <strong>{{ this.$route.params.repo }}</strong>?
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
                    <vl-loader message="De details voor de opensource applicatie worden opgevraagd" />
                  </div>
                </vl-column>

                <vl-column v-if="error" width="12">
                  <vl-alert
                    title="Details opensource applicatie ophalen mislukt"
                    content="Er is iets fout gelopen tijdens het ophalen van de details voor de opensource applicatie. Probeer later opnieuw."
                    mod-error />
                </vl-column>

                <vl-column v-if="loaded" id="readme" width="12">
                  <vl-typography>
                    <h1>Informatie</h1>
                    <p>Aangemaakt op {{ getDateString(created) }}, laatst gewijzigd op {{ getDateString(pushed) }}.</p>
                    <p>De code is te vinden op <vl-link :href="repoUrl">{{ repoUrl }}</vl-link>.</p>
                    <p>Deze opensource applicatie is beschikbaar onder de volgende licentie: <vl-link :href="licenseUrl">{{ license }}</vl-link>.</p>

                    <vue-markdown :source="readme" :breaks="false" />
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
  #readme .vl-typography h1 {
    font-size: 3.4rem;
    font-family: "Flanders Art Sans", sans-serif;
    font-weight: 500;
    margin-bottom: 2rem;
    line-height: 1.24;
  }

  #readme .vl-typography h2 {
    font-size: 2.6rem;
    font-family: "Flanders Art Sans", sans-serif;
    font-weight: 500;
    margin-bottom: 2rem;
    line-height: 1.3;

    padding-bottom: .3em;
    border-bottom: 1px solid #eaecef;
  }

  #readme .vl-typography h2:not(:first-child) {
    margin-top: 3rem;
  }

  #readme .vl-typography h3 {
    font-size: 2.2rem;
    font-family: "Flanders Art Sans", sans-serif;
    font-weight: 500;
    margin-bottom: 2rem;
    line-height: 1.36;
  }

  #readme .vl-typography h3:not(:first-child) {
    margin-top: 0;
  }

  #readme .vl-typography blockquote {
    padding: 0 1em;
    color: #6a737d;
    border-left: .25em solid #dfe2e5;

    position: static;
    font-size: 100%;
    font-weight: 400;
    line-height: 1;
  }

  #readme .vl-typography blockquote::before {
    display: none;
  }

  #readme .vl-typography a {
    color: #05c;
    text-decoration: none;
  }

  #readme .vl-typography a:hover {
    text-decoration: underline;
  }

  #readme .vl-typography pre {
    margin-bottom: 1.8rem;
  }
</style>

<script>
import axios from 'axios';

export default {
  name: 'RepositoryDetail',

  data () {
    return {
      loaded: false,
      error: false,
      readme: '',
      description: '',
      license: '',
      licenseUrl: '',
    };
  },

  mounted () {
    axios
      .get('https://api.github.com/repos/Informatievlaanderen/' + this.$route.params.repo)
      .then(response => {
        this.description = response.data.description;
        this.license = response.data.license.name;
        this.licenseUrl = response.data.license.url;
        this.repoName = response.data.name;
        this.repoUrl = response.data.html_url;
        this.created = new Date(response.data.created_at);
        this.pushed = new Date(response.data.pushed_at);

        axios
          .get('https://raw.githubusercontent.com/Informatievlaanderen/' + this.repoName + '/main/README.md')
          .then(readmeResponse => {
            this.readme = readmeResponse.data;
            this.loaded = true;
          })
          .catch(error => {
            this.error = true;
            console.log('Could not get repository readme.', error);
          });
      })
      .catch(error => {
        this.error = true;
        console.log('Could not get repository.', error);
      });
  },

  methods: {
    getDateString: function (d) {
      return `${d.getFullYear()}-${('0' + d.getMonth()).slice(-2)}-${('0' + d.getDate()).slice(-2)}`;
    },
  },
};
</script>
