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
            <vl-column width="12" v-if="!loaded">
              <vl-grid mod-stacked>
                <vl-column width="12" v-if="!loaded && !error">
                  <div v-vl-align:center>
                    <vl-loader message="Het implementatiemodel wordt opgevraagd" />
                  </div>
                </vl-column>

                <vl-column width="12" v-if="error">
                  <vl-alert
                    title="Implementatiemodel ophalen mislukt"
                    content="Er is iets fout gelopen tijdens het ophalen van het implementatiemodel. Probeer later opnieuw."
                    mod-error />
                </vl-column>
              </vl-grid>
            </vl-column>

            <vl-column width="8" width-m="9" width-s="12" v-if="loaded">
              <vl-grid mod-stacked>
                <vl-column width="12" v-if="loaded">
                  <vl-title tag-name="h2" id="auteurs">Auteurs</vl-title>

                  <dl>
                    <dd v-for="person in authors" inlist="" rel="foaf:maker" class="p-author h-card vcard">
                      <span typeof="foaf:Person">
                        <span class="p-name fn" property="foaf:lastName">{{ person.last_name }}</span>,
                        <span class="p-name fn" property="foaf:firstName">{{ person.first_name }}</span>
                        - <vl-link :href="person.affiliation.website" class="p-org org h-org h-card" rel="foaf:workplaceHomepage">{{ person.affiliation.name }}</vl-link>
                        - <span class="ed_mailto"><vl-link :href="`mailto:${person.email}`" rel="foaf:mbox" class="u-email email">{{ person.email }}</vl-link></span>
                      </span>
                    </dd>
                  </dl>
                </vl-column>

                <vl-column width="12" v-if="loaded">
                  <vl-title tag-name="h2" id="medewerkers">Medewerkers</vl-title>

                  <dl>
                    <dd v-for="person in contributors" inlist="" rel="foaf:maker" class="p-author h-card vcard">
                      <span typeof="foaf:Person">
                        <span class="p-name fn" property="foaf:lastName">{{ person.last_name }}</span>,
                        <span class="p-name fn" property="foaf:firstName">{{ person.first_name }}</span>
                        - <vl-link :href="person.affiliation.website" class="p-org org h-org h-card" rel="foaf:workplaceHomepage">{{ person.affiliation.name }}</vl-link>
                        - <span class="ed_mailto"><vl-link :href="`mailto:${person.email}`" rel="foaf:mbox" class="u-email email">{{ person.email }}</vl-link></span>
                      </span>
                    </dd>
                  </dl>
                </vl-column>

                <vl-column width="12" v-if="loaded">
                  <vl-title tag-name="h2" id="samenvatting">Samenvatting</vl-title>
                </vl-column>

                <vl-column width="12" v-if="loaded">
                  <vl-title tag-name="h2" id="status">Status van dit document</vl-title>
                </vl-column>

                <vl-column width="12" v-if="loaded">
                  <vl-title tag-name="h2" id="licentie">Licentie</vl-title>
                </vl-column>

                <vl-column width="12" v-if="loaded">
                  <vl-title tag-name="h2" id="conformiteit">Conformiteit</vl-title>
                </vl-column>

                <vl-column width="12" v-if="loaded">
                  <vl-title tag-name="h2" id="overzicht">Overzicht</vl-title>

                  <vl-typography class="vl-u-spacer--medium">
                    <p>In dit document wordt correct gebruik van de volgende entiteiten toegelicht:</p>
                  </vl-typography>

                  <vl-grid mod-stacked>
                    <vl-column v-for="oslo_thing in oslo_classes" width="3" width-m="6" width-s="12">
                      <vl-link-list>
                        <vl-link-list-item>
                          <vl-spotlight
                            :title="oslo_thing.name.nl"
                            tagName="router-link"
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
                    <vl-column v-for="oslo_thing in oslo_datatypes" width="3" width-m="6" width-s="12">
                      <vl-link-list>
                        <vl-link-list-item>
                          <vl-spotlight
                            :title="oslo_thing.name.nl"
                            tagName="router-link"
                            :href="idify(`#datatype-${oslo_thing.sort_nl}`)">
                          </vl-spotlight>
                        </vl-link-list-item>
                      </vl-link-list>
                    </vl-column>
                  </vl-grid>
                </vl-column>

                <vl-column width="12" v-if="loaded">
                  <vl-title tag-name="h2" id="entiteiten">Entiteiten</vl-title>

                  <vl-grid mod-stacked>
                    <vl-column v-for="oslo_thing in oslo_classes" width="12">
                      <vl-title tag-name="h3" :id="idify(`class-${oslo_thing.sort_nl}`)"><vl-link :href="oslo_thing.uri" v-vl-tooltip.right="oslo_thing.uri">{{ oslo_thing.name.nl }}</vl-link></vl-title>

                      <vl-title tag-name="h5" :id="idify(`class-${oslo_thing.sort_nl}-beschrijving`)">Beschrijving</vl-title>

                      <vl-typography v-bind:class="{ 'vl-u-spacer--medium': oslo_thing.usage.nl || has_properties(oslo_thing) }">
                        <p>{{ oslo_thing.description.nl }}</p>
                      </vl-typography>

                      <vl-title v-if="oslo_thing.usage.nl" tag-name="h5" :id="idify(`class-${oslo_thing.sort_nl}-gebruik`)">Gebruik</vl-title>

                      <vl-typography v-if="oslo_thing.usage.nl" v-bind:class="{ 'vl-u-spacer--medium': has_properties(oslo_thing) }">
                        <p>{{ oslo_thing.usage.nl }}</p>
                      </vl-typography>

                      <vl-title v-if="has_properties(oslo_thing)" tag-name="h5" :id="idify(`class-${oslo_thing.sort_nl}-eigenschappen`)">Eigenschappen</vl-title>

                      <vl-typography v-if="has_properties(oslo_thing)" class="vl-u-spacer--medium">
                        <p>
                          Voor deze entiteit zijn de volgende eigenschappen gedefinieerd:
                          <ul class="comma-list end-dot">
                            <li v-for="oslo_property in sort_nl(oslo_thing.properties)"><vl-link :href="idify(`#class-${oslo_thing.sort_nl}-eigenschap-${oslo_property.sort_nl}`)" v-scroll-to="{ el: idify(`#class-${oslo_thing.sort_nl}-eigenschap-${oslo_property.sort_nl}`), duration: 0, offset: -43 }">{{ oslo_property.name.nl }}</vl-link></li>
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
                            <tr v-for="oslo_property in sort_nl(oslo_thing.properties)" class="oslo-property" :id="idify(`class-${oslo_thing.sort_nl}-eigenschap-${oslo_property.sort_nl}`)">
                              <td><vl-link :href="oslo_property.uri" v-vl-tooltip.right="oslo_property.uri">{{ oslo_property.name.nl }}</vl-link></td>
                              <td>
                                <ul class="comma-list">
                                  <li v-for="property_range in oslo_property.range"><vl-link :href="property_range.range_uri" v-vl-tooltip.right="property_range.range_uri">{{ property_range.range_label }}</vl-link></li>
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

                <vl-column width="12" v-if="loaded">
                  <vl-title tag-name="h2" id="datatypes">Datatypes</vl-title>

                  <vl-grid mod-stacked>
                    <vl-column v-for="oslo_thing in oslo_datatypes" width="12">
                      <vl-title tag-name="h3" :id="idify(`datatype-${oslo_thing.sort_nl}`)"><vl-link :href="oslo_thing.uri" v-vl-tooltip.right="oslo_thing.uri">{{ oslo_thing.name.nl }}</vl-link></vl-title>

                      <vl-title tag-name="h5" :id="idify(`datatype-${oslo_thing.sort_nl}-beschrijving`)">Beschrijving</vl-title>

                      <vl-typography v-bind:class="{ 'vl-u-spacer--medium': oslo_thing.usage.nl || has_properties(oslo_thing) }">
                        <p>{{ oslo_thing.description.nl }}</p>
                      </vl-typography>

                      <vl-title v-if="oslo_thing.usage.nl" tag-name="h5" :id="idify(`datatype-${oslo_thing.sort_nl}-gebruik`)">Gebruik</vl-title>

                      <vl-typography v-if="oslo_thing.usage.nl" v-bind:class="{ 'vl-u-spacer--medium': has_properties(oslo_thing) }">
                        <p>{{ oslo_thing.usage.nl }}</p>
                      </vl-typography>

                      <vl-title v-if="has_properties(oslo_thing)" tag-name="h5" :id="idify(`datatype-${oslo_thing.sort_nl}-eigenschappen`)">Eigenschappen</vl-title>

                      <vl-typography v-if="has_properties(oslo_thing)" class="vl-u-spacer--medium">
                        <p>
                          Voor deze entiteit zijn de volgende eigenschappen gedefinieerd:
                          <ul class="comma-list end-dot">
                            <li v-for="oslo_property in sort_nl(oslo_thing.properties)"><vl-link :href="idify(`#datatype-${oslo_thing.sort_nl}-eigenschap-${oslo_property.sort_nl}`)" v-scroll-to="{ el: idify(`#datatype-${oslo_thing.sort_nl}-eigenschap-${oslo_property.sort_nl}`), duration: 0, offset: -43 }">{{ oslo_property.name.nl }}</vl-link></li>
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
                            <tr v-for="oslo_property in sort_nl(oslo_thing.properties)" class="oslo-property" :id="idify(`datatype-${oslo_thing.sort_nl}-eigenschap-${oslo_property.sort_nl}`)">
                              <td><vl-link :href="oslo_property.uri" v-vl-tooltip.right="oslo_property.uri">{{ oslo_property.name.nl }}</vl-link></td>
                              <td>
                                <ul class="comma-list">
                                  <li v-for="property_range in oslo_property.range"><vl-link :href="property_range.range_uri" v-vl-tooltip.right="property_range.range_uri">{{ property_range.range_label }}</vl-link></li>
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

                <vl-column width="12" v-if="loaded">
                  <vl-title tag-name="h2" id="json-ld">JSON-LD context</vl-title>

                </vl-column>
              </vl-grid>
            </vl-column>

            <vl-column
              width="3"
              push="1"
              push-m="reset"
              width-s="12"
              class="wp-pt-side-navigation wp-pt-side-navigation--sticky-parent"
              v-if="loaded"
            >
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
                        <vl-side-navigation-item v-for="oslo_class in oslo_classes" :href="idify(`#class-${oslo_class.sort_nl}`)" :text="oslo_class.name.nl"/>
                      </vl-side-navigation-list>
                    </vl-side-navigation-item>
                    <vl-side-navigation-item href="#datatypes" text="Datatypes">
                      <vl-side-navigation-list>
                        <vl-side-navigation-item v-for="oslo_datatype in oslo_datatypes" :href="idify(`#class-${oslo_datatype.sort_nl}`)" :text="oslo_datatype.name.nl"/>
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
import axios from "axios";

export default {
  name: "applicationprofile-building",
  data () {
    return {
      loaded: false,
      error: false,
      profile: {
        contributors: [],
        classes: [],
        datatypes: []
      }
    }
  },
  computed: {
    authors() {
      return this.profile.contributors.filter(item => {
        return item.role.toLowerCase() === "a";
      });
    },
    contributors() {
      return this.profile.contributors.filter(item => {
        return item.role.toLowerCase() === "c";
      });
    },
    oslo_classes() {
      return this.sort_nl(this.profile.classes);
    },
    oslo_datatypes() {
      return this.sort_nl(this.profile.datatypes);
    }
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
      return text.toLowerCase().replace(/ /g, "-");
    }
  },
  mounted () {
    axios
      //.get(window.baseRegistriesApi + "/v1/versions")
      .get("https://raw.githubusercontent.com/Informatievlaanderen/OSLO-Generated/test-feature-checkout/report/doc/applicatieprofiel/adresregister/ontwerpdocument/niet-bepaald/html-nj.json")
      .then(response => {
        this.profile = response.data;
        this.loaded = true;
      })
      .catch(error => {
        this.error = true;
        console.log("Could not get applicationprofile.", error);
      });
  }
};
</script>
