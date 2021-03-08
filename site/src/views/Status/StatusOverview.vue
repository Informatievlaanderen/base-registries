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
                    registery-id="municipality"
                    :status="municipalityRegistry"
                    @refresh="fetch" />
                </vl-column>

                <vl-column width="12" width-m="6" width-s="12">
                  <registry-status
                    title="Postinfo"
                    registery-id="postal"
                    :status="postalRegistry"
                    @refresh="fetch" />
                </vl-column>

                <vl-column width="12" width-m="6" width-s="12">
                  <registry-status
                    title="Straatnamen"
                    registery-id="streetname"
                    :status="streetNameRegistry"
                    @refresh="fetch" />
                </vl-column>

                <vl-column width="12" width-m="6" width-s="12">
                  <registry-status
                    title="Adressen"
                    registery-id="address"
                    :status="addressRegistry"
                    @refresh="fetch" />
                </vl-column>

                <vl-column width="12" width-m="6" width-s="12">
                  <registry-status
                    title="Gebouwen &amp; gebouweenheden"
                    registery-id="building"
                    :status="buildingRegistry"
                    @refresh="fetch" />
                </vl-column>

                <vl-column width="12" width-m="6" width-s="12">
                  <registry-status
                    title="Percelen"
                    registery-id="parcel"
                    :status="parcelRegistry"
                    @refresh="fetch" />
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
import RegistryStatus from './RegistryStatus.vue';
import axios from 'axios';

export default {
  name: 'StatusOverview',
  components: {
    RegistryStatus,
  },
  data () {
    return {
      addressRegistry: {
        hide: [],
        isLoading: [],
        streamPositions: {},
      },
      buildingRegistry: {
        hide: [],
        isLoading: [],
        streamPositions: {},
      },
      municipalityRegistry: {
        hide: ['syndication'],
        isLoading: [],
        streamPositions: {},
      },
      parcelRegistry: {
        hide: [],
        isLoading: [],
        streamPositions: {},
      },
      postalRegistry: {
        hide: ['import'],
        isLoading: [],
        streamPositions: {},
      },
      streetNameRegistry: {
        hide: [],
        isLoading: [],
        streamPositions: {},
      },
    };
  },
  mounted () {
    this.fetch(['projections', 'cache', 'import', 'syndication']);
    this.scrollToHash();
  },
  methods: {
    setStreamPositions: function() {
      const streamPositions = {};
      for (const registry in this) {
        const registryProperty = this[registry] || {};
        if (typeof registryProperty === 'object'  && 'projections' in registryProperty) {
          const { streamPosition } = registryProperty.projections || {};
          if (Number.isInteger(streamPosition)) {
            streamPositions[registry] = Number(streamPosition);
          }
        }
      }
      for (const registry in this) {
        const registryProperty = this[registry] || {};
        if (typeof registryProperty === 'object'  && 'streamPositions' in registryProperty) {
          registryProperty.streamPositions = streamPositions;
        }
      }
    },
    setStatusFor: function(category, statusData) {
      for (const registry in statusData) {
        const data = statusData[registry];
        if (!this[registry][category]) {
          this.$set(this[registry], category, data);
        } else {
          this[registry][category] = data;
        }
      }
      if (category === 'projections') {
        this.setStreamPositions();
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
      const statusUrl = (window.baseRegistriesApi || '[baseregistries-api-url-not-set]').replace(/\/$/, '') + path;
      this.beginLoading(category);
      axios
        .get(statusUrl)
        .then(({ data }) => {
          this.setStatusFor(category, data);
          this.loadingStopped(category);
        })
        .catch(error => {
          console.log(`Could not fetch status data from ${statusUrl}.`, error);
          this.loadingStopped(category);
        });
    },
    fetch: function(catergories = []) {
      const statusPaths = {
        projections: '/v1/status/projection',
        import: '/v1/status/import',
        cache: '/v1/status/cache',
        syndication: '/v1/status/syndication',
      };

      for (const category of catergories) {
        if (statusPaths[category]) {
          this.fetchStatus(category, statusPaths[category]);
        }
      }
    },
    scrollToHash: function() {
      this.$nextTick(() => {
        if (this.$route.hash) {
          const el = document.querySelector(this.$route.hash);
          el && el.scrollIntoView();
        }
      });
    },
  },
};
</script>
