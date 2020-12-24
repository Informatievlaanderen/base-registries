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
        isLoading: [],
      },
      buildingRegistry: {
        isLoading: [],
      },
      municipalityRegistry: {
        isLoading: [],
      },
      parcelRegistry: {
        isLoading: [],
      },
      postalRegistry: {
        isLoading: [],
      },
      streetNameRegistry: {
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

    function setStatusFor(vueInstance, category, statusData) {
      for (const registry in statusData) {
        const data = statusData[registry] || [];
        if (!vueInstance[registry][category]) {
          vueInstance.$set(vueInstance[registry], category, data);
        } else {
          vueInstance[registry][category] = data;
        }
      }
    }

    function beginLoading(vueInstance, category) {
      for (const property in vueInstance) {
        const registryProperty = vueInstance[property] || {};
        if (typeof registryProperty === 'object'  && 'isLoading' in registryProperty) {
          registryProperty.isLoading.push(category);
        }
      }
    }

    function loadingStopped(vueInstance, category) {
      for (const property in vueInstance) {
        const registryProperty = vueInstance[property] || {};
        if (typeof registryProperty === 'object'  && 'isLoading' in registryProperty) {
          registryProperty.isLoading = registryProperty.isLoading.filter(c => c !== category);
        }
      }
    }

    function fetchStatus(vueInstance, category, path){
      beginLoading(vueInstance, category);
      axios
        .get(window.baseRegistriesApi + path)
        .then(({ data }) => {
          setStatusFor(vueInstance, category, data);
          loadingStopped(vueInstance, category);
        })
        .catch(error => {
          console.log(`Could not fetch status data from ${window.baseRegistriesApi + path}.`, error); 
          loadingStopped(vueInstance, category);
        });
    }

    fetchStatus(this, 'projections', '/v1/status/projection');
    fetchStatus(this, 'import', '/v1/status/import');
    fetchStatus(this, 'cache', '/v1/status/cache');
  },
};
</script>
