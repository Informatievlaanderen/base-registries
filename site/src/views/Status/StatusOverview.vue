<template>
  <vl-page>
    <vl-region mod-no-space-bottom>
      <vl-layout>
        <header class="wp-pt-heading">
          <div class="wp-pt-heading__title-wrapper">
            <vl-title tag-name="h1" class="wp-pt-heading__title">Status</vl-title>
          </div>

          <vl-grid>
            <vl-column width="9" width-s="12">
              <div class="wp-pt-heading__content">
                <vl-typography>
                  <vl-introduction>
                    Wat is de <strong>huidige</strong> status van de basisregisters? Bekijk hier het live overzicht!
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

                <vl-column width="12" width-m="6" width-s="12">
                  <registry-status
                    title="Gemeenten"
                    text="de Belgische gemeenten."
                    to="/registers/gemeenten"
                    :status="municipalityRegistry" />
                </vl-column>

                <vl-column width="12" width-m="6" width-s="12">
                  <registry-status
                    title="Postinformatie"
                    text="de Belgische postcodes."
                    to="/registers/postinformatie"
                    :status="postalRegistry" />
                </vl-column>

                <vl-column width="12" width-m="6" width-s="12">
                  <registry-status
                    title="Straatnamen"
                    text="de Vlaamse straatnamen."
                    to="/registers/straatnamen"
                    :status="streetNameRegistry" />
                </vl-column>

                <vl-column width="12" width-m="6" width-s="12">
                  <registry-status
                    title="Adressen"
                    text="de Vlaamse adressen."
                    to="/registers/adressen"
                    :status="addressRegistry" />
                </vl-column>

                <vl-column width="12" width-m="6" width-s="12">
                  <registry-status
                    title="Gebouwen"
                    text="de Vlaamse gebouwen en gebouweenheden."
                    to="/registers/gebouwen"
                    :status="buildingRegistry" />
                </vl-column>

                <vl-column width="12" width-m="6" width-s="12">
                  <registry-status
                    title="Percelen"
                    text="de Vlaamse percelen."
                    to="/registers/percelen"
                    :status="parcelRegistry" />
                </vl-column>

                <!-- <debug /> -->

              </vl-grid>
            </vl-column>
          </vl-grid>
        </vl-layout>
      </vl-region>
    </vl-main>
  </vl-page>
</template>

<script>
import RegistryStatus from './RegistryStatus.vue';
// import Debug from './Debug.vue';
import axios from 'axios';

export default {
  name: 'StatusOverview',
  components: {
    RegistryStatus,
    // Debug,
  },
  data () {
    return {
      addressRegistry: {
        hide: ['cache'],
        isLoading: [],
      },
      buildingRegistry: {
        hide: ['cache'],
        isLoading: [],
      },
      municipalityRegistry: {
        hide: ['cache'],
        isLoading: [],
      },
      parcelRegistry: {
        hide: ['cache'],
        isLoading: [],
      },
      postalRegistry: {
        hide: ['cache', 'import'],
        isLoading: [],
      },
      streetNameRegistry: {
        hide: ['cache'],
        isLoading: [],
      },
    };
  },
  mounted () {

    /* TODO: REMOVE - set debugging api*/
    if (!window.baseRegistriesApi){
      window.baseRegistriesApi = 'https://api.basisregisters.dev-vlaanderen.be';
      console.log('setting baseRegistriesApi', window.baseRegistriesApi);
    }
    /* END TODO*/

    this.fetchAll();
  },
  methods: {
    setStatusFor: function(category, statusData) {
      for (const registry in statusData) {
        const data = statusData[registry] || [];
        if (!this[registry][category]) {
          this.$set(this[registry], category, data);
        } else {
          this[registry][category] = data;
        }
      }
    },
    beginLoading: function(category) {
      for (const property in this) {
        const registryProperty = this[property] || {};
        if (typeof registryProperty === 'object'  && 'isLoading' in registryProperty) {
          registryProperty.isLoading.push(category);
          if (registryProperty[category]) {
            registryProperty[category] = null;
          }
        }
      }
    },
    loadingStopped: function(category) {
      for (const property in this) {
        const registryProperty = this[property] || {};
        if (typeof registryProperty === 'object'  && 'isLoading' in registryProperty) {
          registryProperty.isLoading = registryProperty.isLoading.filter(c => c !== category);
        }
      }
    },
    fetchStatus: function(category, path) {
      this.beginLoading(category);
      axios
        .get(window.baseRegistriesApi + path)
        .then(({ data }) => {
          this.setStatusFor(category, data);
          this.loadingStopped(category);
        })
        .catch(error => {
          console.log(`Could not fetch status data from ${window.baseRegistriesApi + path}.`, error); 
          this.loadingStopped(category);
        });
    },
    fetchAll: function() {
      this.fetchStatus('projections', '/v1/status/projection');
      this.fetchStatus('import', '/v1/status/import');
      this.fetchStatus('cache', '/v1/status/cache');
    },
  },
};
</script>
