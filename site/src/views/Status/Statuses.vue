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
                    :version="municipalityRegistry"
                    :status="municipalityRegistry" />
                </vl-column>

                <vl-column width="12" width-m="6" width-s="12">
                  <registry-status
                    title="Postinformatie"
                    text="de Belgische postcodes."
                    to="/registers/postinformatie"
                    :version="postalRegistry"
                    :status="postalRegistry" />
                </vl-column>

                <vl-column width="12" width-m="6" width-s="12">
                  <registry-status
                    title="Straatnamen"
                    text="de Vlaamse straatnamen."
                    to="/registers/straatnamen"
                    :version="streetNameRegistry"
                    :status="streetNameRegistry" />
                </vl-column>

                <vl-column width="12" width-m="6" width-s="12">
                  <registry-status
                    title="Adressen"
                    text="de Vlaamse adressen."
                    to="/registers/adressen"
                    :version="addressRegistry"
                    :status="addressRegistry" />
                </vl-column>

                <vl-column width="12" width-m="6" width-s="12">
                  <registry-status
                    title="Gebouwen"
                    text="de Vlaamse gebouwen en gebouweenheden."
                    to="/registers/gebouwen"
                    :version="buildingRegistry"
                    :status="buildingRegistry" />
                </vl-column>

                <vl-column width="12" width-m="6" width-s="12">
                  <registry-status
                    title="Percelen"
                    text="de Vlaamse percelen."
                    to="/registers/percelen"
                    :version="parcelRegistry"
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
import Debug from './Debug.vue';
import axios from 'axios';

export default {
  name: 'Statuses',
  components: {
    RegistryStatus,
    Debug,
  },
  data () {
    return {
      addressRegistry: {},
      buildingRegistry: {},
      municipalityRegistry: {},
      parcelRegistry: {},
      postalRegistry: {},
      streetNameRegistry: {},
    };
  },
  mounted () {

    /* TODO: REMOVE - set debugging api*/
    if(!window.baseRegistriesApi){
      window.baseRegistriesApi = 'https://api.basisregisters.dev-vlaanderen.be';
      console.log('setting baseRegistriesApi', window.baseRegistriesApi);
    }
    /* END TODO*/

    function setStatusFor(self, category, statusData){
      for(const registry in statusData){
        if(!self[registry][category]){
          self.$set(self[registry], category, statusData[registry]);
        } else {
          self[registry][category] = statusData[registry];
        }
      }
    }

    function fetchStatus(self, category, path){
      axios
        .get(window.baseRegistriesApi + path)
        .then(({ data }) => { 
          setStatusFor(self, category, data); 
        })
        .catch(error => {
          console.log(`Could not fetch status data from ${window.baseRegistriesApi + path}.`, error); 
        });
    }

    fetchStatus(this, 'projections', '/v1/status/projection');
    fetchStatus(this, 'import', '/v1/status/import');
    fetchStatus(this, 'cache', '/v1/status/cache');
  },
};
</script>
