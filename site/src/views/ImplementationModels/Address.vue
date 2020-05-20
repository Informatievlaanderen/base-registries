<template>
  <vl-page>
    <vl-region mod-no-space-bottom>
      <vl-layout>
        <header class="wp-pt-heading">
          <div class="wp-pt-heading__parent">
            <vl-link to="/implementatiemodel" mod-bold>Implementatiemodel</vl-link>
          </div>

          <div class="wp-pt-heading__title-wrapper">
            <vl-title tag-name="h1" class="wp-pt-heading__title">Adressenregister</vl-title>
          </div>

          <vl-grid>
            <vl-column width="9" width-s="12">
              <div class="wp-pt-heading__content">
                <vl-typography>
                  <vl-introduction>
                    Dit implementatiemodel definieert een specificatie voor de uitwisseling van <strong>adresgegevens</strong> in de context van een adresregister.
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
            <vl-column v-if="!loaded" width="12">
              <vl-grid mod-stacked>
                <vl-column v-if="!loaded && !error" width="12">
                  <div v-vl-align:center>
                    <vl-loader message="Het implementatiemodel wordt opgevraagd" />
                  </div>
                </vl-column>

                <vl-column v-if="error" width="12">
                  <vl-alert
                    title="Implementatiemodel ophalen mislukt"
                    content="Er is iets fout gelopen tijdens het ophalen van het implementatiemodel. Probeer later opnieuw."
                    mod-error />
                </vl-column>
              </vl-grid>
            </vl-column>

            <vl-column v-if="loaded" width="8" width-m="9" width-s="12">
              <vl-grid mod-stacked>
                <vl-column v-if="loaded" width="12">
                  <vl-title id="auteurs" tag-name="h2">Auteurs</vl-title>

                  <dl>
                    <dd v-for="person in authors" :key="person.email" inlist="" rel="foaf:maker" class="p-author h-card vcard">
                      <span typeof="foaf:Person">
                        <span class="p-name fn" property="foaf:lastName">{{ person.last_name }}</span>,
                        <span class="p-name fn" property="foaf:firstName">{{ person.first_name }}</span>
                        - <vl-link :href="person.affiliation.website" class="p-org org h-org h-card" rel="foaf:workplaceHomepage">{{ person.affiliation.name }}</vl-link>
                        - <span class="ed_mailto"><vl-link :href="`mailto:${person.email}`" rel="foaf:mbox" class="u-email email">{{ person.email }}</vl-link></span>
                      </span>
                    </dd>
                  </dl>
                </vl-column>

                <vl-column v-if="loaded" width="12">
                  <vl-title id="medewerkers" tag-name="h2">Medewerkers</vl-title>

                  <dl>
                    <dd v-for="person in contributors" :key="person.email" inlist="" rel="foaf:maker" class="p-author h-card vcard">
                      <span typeof="foaf:Person">
                        <span class="p-name fn" property="foaf:lastName">{{ person.last_name }}</span>,
                        <span class="p-name fn" property="foaf:firstName">{{ person.first_name }}</span>
                        - <vl-link :href="person.affiliation.website" class="p-org org h-org h-card" rel="foaf:workplaceHomepage">{{ person.affiliation.name }}</vl-link>
                        - <span class="ed_mailto"><vl-link :href="`mailto:${person.email}`" rel="foaf:mbox" class="u-email email">{{ person.email }}</vl-link></span>
                      </span>
                    </dd>
                  </dl>
                </vl-column>

                <vl-column v-if="loaded" width="12">
                  <vl-title id="samenvatting" tag-name="h2">Samenvatting</vl-title>
                </vl-column>

                <vl-column v-if="loaded" width="12">
                  <vl-title id="status" tag-name="h2">Status van dit document</vl-title>
                </vl-column>

                <vl-column v-if="loaded" width="12">
                  <vl-title id="licentie" tag-name="h2">Licentie</vl-title>
                </vl-column>

                <vl-column v-if="loaded" width="12">
                  <vl-title id="conformiteit" tag-name="h2">Conformiteit</vl-title>
                </vl-column>

                <vl-column v-if="loaded" width="12">
                  <vl-title id="overzicht" tag-name="h2">Overzicht</vl-title>

                  <vl-typography class="vl-u-spacer--medium">
                    <p>In dit document wordt correct gebruik van de volgende entiteiten toegelicht:</p>
                  </vl-typography>

                  <vl-grid mod-stacked>
                    <vl-column v-for="oslo_thing in oslo_classes" :key="oslo_thing.uri" width="3" width-m="6" width-s="12">
                      <vl-link-list>
                        <vl-link-list-item>
                          <vl-spotlight
                            :title="oslo_thing.name.nl"
                            tag-name="router-link"
                            :href="idify(`#class-${oslo_thing.sort_nl}`)">
                          </vl-spotlight>
                        </vl-link-list-item>
                      </vl-link-list>
                    </vl-column>
                  </vl-grid>

                  <vl-typography class="vl-u-spacer--medium">
                    <p>In dit document worden de volgende datatypes toegelicht:</p>
                  </vl-typography>

                  <vl-grid mod-stacked>
                    <vl-column v-for="oslo_thing in oslo_datatypes" :key="oslo_thing.uri" width="3" width-m="6" width-s="12">
                      <vl-link-list>
                        <vl-link-list-item>
                          <vl-spotlight
                            :title="oslo_thing.name.nl"
                            tag-name="router-link"
                            :href="idify(`#datatype-${oslo_thing.sort_nl}`)">
                          </vl-spotlight>
                        </vl-link-list-item>
                      </vl-link-list>
                    </vl-column>
                  </vl-grid>
                </vl-column>

                <vl-column v-if="loaded" width="12">
                  <vl-title id="entiteiten" tag-name="h2">Entiteiten</vl-title>

                  <vl-grid mod-stacked>
                    <vl-column v-for="oslo_thing in oslo_classes" :key="oslo_thing.uri" width="12">
                      <vl-title :id="idify(`class-${oslo_thing.sort_nl}`)" tag-name="h3"><vl-link v-vl-tooltip.right="oslo_thing.uri" :href="oslo_thing.uri">{{ oslo_thing.name.nl }}</vl-link></vl-title>

                      <vl-title :id="idify(`class-${oslo_thing.sort_nl}-beschrijving`)" tag-name="h5">Beschrijving</vl-title>

                      <vl-typography :class="{ 'vl-u-spacer--medium': oslo_thing.usage.nl || has_properties(oslo_thing) }">
                        <p>{{ oslo_thing.description.nl }}</p>
                      </vl-typography>

                      <vl-title v-if="oslo_thing.usage.nl" :id="idify(`class-${oslo_thing.sort_nl}-gebruik`)" tag-name="h5">Gebruik</vl-title>

                      <vl-typography v-if="oslo_thing.usage.nl" :class="{ 'vl-u-spacer--medium': has_properties(oslo_thing) }">
                        <p>{{ oslo_thing.usage.nl }}</p>
                      </vl-typography>

                      <vl-title v-if="has_properties(oslo_thing)" :id="idify(`class-${oslo_thing.sort_nl}-eigenschappen`)" tag-name="h5">Eigenschappen</vl-title>

                      <vl-typography v-if="has_properties(oslo_thing)" class="vl-u-spacer--medium">
                        <p>
                          Voor deze entiteit zijn de volgende eigenschappen gedefinieerd:
                          <ul class="comma-list end-dot">
                            <li v-for="oslo_property in sort_nl(oslo_thing.properties)" :key="oslo_property.uri"><vl-link v-scroll-to="{ el: idify(`#class-${oslo_thing.sort_nl}-eigenschap-${oslo_property.sort_nl}`), duration: 0, offset: -43 }" :href="idify(`#class-${oslo_thing.sort_nl}-eigenschap-${oslo_property.sort_nl}`)">{{ oslo_property.name.nl }}</vl-link></li>
                          </ul>
                        </p>
                      </vl-typography>

                      <div v-if="has_properties(oslo_thing)" class="vl-u-table-overflow">
                        <vl-data-table mod-zebra>
                          <thead>
                            <tr>
                              <th>Eigenschap</th>
                              <th>Verwacht Type</th>
                              <th>Kardinaliteit</th>
                              <th>Beschrijving</th>
                              <th>Gebruik</th>
                              <th>Codelijst</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr v-for="oslo_property in sort_nl(oslo_thing.properties)" :id="idify(`class-${oslo_thing.sort_nl}-eigenschap-${oslo_property.sort_nl}`)" :key="oslo_property.uri" class="oslo-property">
                              <td><vl-link v-vl-tooltip.right="oslo_property.uri" :href="oslo_property.uri">{{ oslo_property.name.nl }}</vl-link></td>
                              <td>
                                <ul class="comma-list">
                                  <li v-for="property_range in oslo_property.range" :key="property_range.range_uri"><vl-link v-vl-tooltip.right="property_range.range_uri" :href="property_range.range_uri">{{ property_range.range_label }}</vl-link></li>
                                </ul>
                              </td>
                              <td>{{ oslo_property.cardinality }}</td>
                              <td>{{ oslo_property.description.nl }}</td>
                              <td>{{ oslo_property.usage.nl }}</td>
                              <td><vl-link v-if="oslo_property.codelist_uri" :href="oslo_property.codelist_uri">Link</vl-link></td>
                            </tr>
                          </tbody>
                        </vl-data-table>
                      </div>
                    </vl-column>
                  </vl-grid>
                </vl-column>

                <vl-column v-if="loaded" width="12">
                  <vl-title id="datatypes" tag-name="h2">Datatypes</vl-title>

                  <vl-grid mod-stacked>
                    <vl-column v-for="oslo_thing in oslo_datatypes" :key="oslo_thing.uri" width="12">
                      <vl-title :id="idify(`datatype-${oslo_thing.sort_nl}`)" tag-name="h3"><vl-link v-vl-tooltip.right="oslo_thing.uri" :href="oslo_thing.uri">{{ oslo_thing.name.nl }}</vl-link></vl-title>

                      <vl-title :id="idify(`datatype-${oslo_thing.sort_nl}-beschrijving`)" tag-name="h5">Beschrijving</vl-title>

                      <vl-typography :class="{ 'vl-u-spacer--medium': oslo_thing.usage.nl || has_properties(oslo_thing) }">
                        <p>{{ oslo_thing.description.nl }}</p>
                      </vl-typography>

                      <vl-title v-if="oslo_thing.usage.nl" :id="idify(`datatype-${oslo_thing.sort_nl}-gebruik`)" tag-name="h5">Gebruik</vl-title>

                      <vl-typography v-if="oslo_thing.usage.nl" :class="{ 'vl-u-spacer--medium': has_properties(oslo_thing) }">
                        <p>{{ oslo_thing.usage.nl }}</p>
                      </vl-typography>

                      <vl-title v-if="has_properties(oslo_thing)" :id="idify(`datatype-${oslo_thing.sort_nl}-eigenschappen`)" tag-name="h5">Eigenschappen</vl-title>

                      <vl-typography v-if="has_properties(oslo_thing)" class="vl-u-spacer--medium">
                        <p>
                          Voor deze entiteit zijn de volgende eigenschappen gedefinieerd:
                          <ul class="comma-list end-dot">
                            <li v-for="oslo_property in sort_nl(oslo_thing.properties)" :key="oslo_property.uri"><vl-link v-scroll-to="{ el: idify(`#datatype-${oslo_thing.sort_nl}-eigenschap-${oslo_property.sort_nl}`), duration: 0, offset: -43 }" :href="idify(`#datatype-${oslo_thing.sort_nl}-eigenschap-${oslo_property.sort_nl}`)">{{ oslo_property.name.nl }}</vl-link></li>
                          </ul>
                        </p>
                      </vl-typography>

                      <div v-if="has_properties(oslo_thing)" class="vl-u-table-overflow">
                        <vl-data-table mod-zebra>
                          <thead>
                            <tr>
                              <th>Eigenschap</th>
                              <th>Verwacht Type</th>
                              <th>Kardinaliteit</th>
                              <th>Beschrijving</th>
                              <th>Gebruik</th>
                              <th>Codelijst</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr v-for="oslo_property in sort_nl(oslo_thing.properties)" :id="idify(`datatype-${oslo_thing.sort_nl}-eigenschap-${oslo_property.sort_nl}`)" :key="oslo_property.uri" class="oslo-property">
                              <td><vl-link v-vl-tooltip.right="oslo_property.uri" :href="oslo_property.uri">{{ oslo_property.name.nl }}</vl-link></td>
                              <td>
                                <ul class="comma-list">
                                  <li v-for="property_range in oslo_property.range" :key="property_range.range_uri"><vl-link v-vl-tooltip.right="property_range.range_uri" :href="property_range.range_uri">{{ property_range.range_label }}</vl-link></li>
                                </ul>
                              </td>
                              <td>{{ oslo_property.cardinality }}</td>
                              <td>{{ oslo_property.description.nl }}</td>
                              <td>{{ oslo_property.usage.nl }}</td>
                              <td><vl-link v-if="oslo_property.codelist_uri" :href="oslo_property.codelist_uri">Link</vl-link></td>
                            </tr>
                          </tbody>
                        </vl-data-table>
                      </div>
                    </vl-column>
                  </vl-grid>
                </vl-column>

                <vl-column v-if="loaded" width="12">
                  <vl-title id="json-ld" tag-name="h2">JSON-LD context</vl-title>

                </vl-column>
              </vl-grid>
            </vl-column>

            <vl-column
              v-if="loaded"
              width="3"
              push="1"
              push-m="reset"
              width-s="12"
              class="wp-pt-side-navigation wp-pt-side-navigation--sticky-parent">
              <aside class="wp-pt-side-navigation--sticky" style="top: 120px;">
                <vl-side-navigation title="Op deze pagina">
                  <vl-side-navigation-list>
                    <vl-side-navigation-item href="#auteurs" text="Auteurs" />
                    <vl-side-navigation-item href="#medewerkers" text="Medewerkers" />
                    <vl-side-navigation-item href="#samenvatting" text="Samenvatting" />
                    <vl-side-navigation-item href="#status" text="Status van dit document" />
                    <vl-side-navigation-item href="#licentie" text="Licentie" />
                    <vl-side-navigation-item href="#conformiteit" text="Conformiteit" />
                    <vl-side-navigation-item href="#overzicht" text="Overzicht" />
                    <vl-side-navigation-item href="#entiteiten" text="Entiteiten">
                      <vl-side-navigation-list>
                        <vl-side-navigation-item v-for="oslo_thing in oslo_classes" :key="oslo_thing.uri" :href="idify(`#class-${oslo_thing.sort_nl}`)" :text="oslo_thing.name.nl" />
                      </vl-side-navigation-list>
                    </vl-side-navigation-item>
                    <vl-side-navigation-item href="#datatypes" text="Datatypes">
                      <vl-side-navigation-list>
                        <vl-side-navigation-item v-for="oslo_thing in oslo_datatypes" :key="oslo_thing.uri" :href="idify(`#class-${oslo_thing.sort_nl}`)" :text="oslo_thing.name.nl" />
                      </vl-side-navigation-list>
                    </vl-side-navigation-item>
                    <vl-side-navigation-item href="#json-ld" text="JSON-LD context" />
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

<style lang="scss">
  .comma-list {
    display: inline !important;;
    list-style: none !important;
    padding: 0px !important;
    margin: 0px !important;
  }

  .comma-list li {
    display: inline !important;
    margin: 0 !important;
  }

  .comma-list li::after {
    content: ", ";
  }

  .comma-list li:last-child::after {
      content: "";
  }

  .comma-list.end-dot li:last-child::after {
      content: ".";
  }
</style>

<script>
import axios from 'axios';

export default {
  name: 'ApplicationprofileBuilding',

  data () {
    return {
      loaded: false,
      error: false,
      profile: {
        contributors: [],
        classes: [],
        datatypes: [],
      },
    };
  },

  computed: {
    authors() {
      return this.profile.contributors.filter(item => {
        return item.role.toLowerCase() === 'a';
      });
    },

    contributors() {
      return this.profile.contributors.filter(item => {
        return item.role.toLowerCase() === 'c';
      });
    },

    oslo_classes() {
      return this.sort_nl(this.profile.classes);
    },

    oslo_datatypes() {
      return this.sort_nl(this.profile.datatypes);
    },
  },

  mounted () {
    axios
      //.get(window.baseRegistriesApi + "/v1/versions")
      .get('https://raw.githubusercontent.com/Informatievlaanderen/OSLO-Generated/test-feature-checkout/report/doc/applicatieprofiel/adressenregister/ontwerpdocument/niet-bepaald/html-nj.json')
      .then(response => {
        this.profile = response.data;
        this.loaded = true;
      })
      .catch(error => {
        this.error = true;
        console.log('Could not get applicationprofile.', error);
      });
  },

  methods: {
    sort_nl(items) {
      return [...items].sort((a, b) => {
        return a.sort_nl.localeCompare(b.sort_nl);
      });
    },

    has_properties(oslo) {
      return oslo.properties.length > 0;
    },

    idify(text) {
      return text.toLowerCase().replace(/ /g, '-');
    },
  },
};
</script>
