<template>
  <vl-page>
    <vl-region mod-no-space-bottom>
      <vl-layout>
        <header class="wp-pt-heading">
          <div class="wp-pt-heading__parent">
            <vl-link to="/" mod-bold>Overzicht</vl-link>
          </div>

          <div class="wp-pt-heading__title-wrapper">
            <vl-title tag-name="h1" class="wp-pt-heading__title">Opensource componenten</vl-title>
          </div>

          <vl-grid>
            <vl-column width="9" width-s="12">
              <div class="wp-pt-heading__content">
                <vl-typography>
                  <vl-introduction>
                    Welke <strong>opensource componenten</strong> bieden wij allemaal aan? Bekijk hier het overzicht!
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
                    <vl-loader message="De opensource componenten worden opgevraagd" />
                  </div>
                </vl-column>

                <vl-column v-if="error" width="12">
                  <vl-alert
                    title="Opensource componenten ophalen mislukt"
                    content="Er is iets fout gelopen tijdens het ophalen van de opensource componenten. Probeer later opnieuw."
                    mod-error />
                </vl-column>

                <vl-column v-if="loaded" width="12">
                  <vl-typography>
                    <p>Momenteel bieden we <strong>{{ repositories.length }}</strong> opensource componenten aan.</p>
                    <p>Deze opensource componenten komen rechtstreeks van onze <a href="https://github.com/Informatievlaanderen/">GitHub pagina</a> en zijn door hun internationale doelgroep enkel beschikbaar in het Engels.</p>
                    <p>Neem een kijkje bij elk component om meer te komen weten over het gebruik en de bijhorende licentie.</p>
                  </vl-typography>

                  <repository
                    v-for="item in repositories"
                    :key="item.id"
                    :title="item.name"
                    :text="item.description"
                    :to="'/opensource-componenten/' + item.name" />
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
import Repository from './../OpenSource/Repository.vue';
import axios from 'axios';
import _ from 'lodash';

export default {
  name: 'Repositories',
  components: {
    Repository,
  },
  data () {
    return {
      loaded: false,
      error: false,
      repositories: [],
    };
  },
  mounted () {
    var config = {
      headers: {
        'Accept': 'application/vnd.github.mercy-preview+json',
      },
    };

    // This is a hacky way to get 2 pages, but it will do for now.
    // https://api.github.com/orgs/Informatievlaanderen/repos?type=all&sort=full_name&direction=asc&per_page=100&page=2
    axios
      .get('https://api.github.com/orgs/Informatievlaanderen/repos?type=all&sort=full_name&direction=asc&per_page=100&page=1', config)
      .then(repositories1 => {
        axios
          .get('https://api.github.com/orgs/Informatievlaanderen/repos?type=all&sort=full_name&direction=asc&per_page=100&page=2', config)
          .then(repositories2 => {
            this.repositories = this.filterRepositories(repositories1.data.concat(repositories2.data));
            this.loaded = true;
          })
          .catch(error => {
            this.error = true;
            console.log('Could not get repositories.', error);
          });
      })
      .catch(error => {
        this.error = true;
        console.log('Could not get repositories.', error);
      });
  },
  methods:
  {
    filterRepositories: function (repositories) {
      var filteredRepositories = _.filter(repositories, { 'topics': ['base-registries-component'] });
      var sortedRepositories = _.sortBy(filteredRepositories, 'name');
      return sortedRepositories;
    },
  },
};
</script>
