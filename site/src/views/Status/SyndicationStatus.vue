<template>
  <status-category
    title="Register synchronisatie"
    :category-id="categoryId"
    :alert-level="alertLevel"
    :show-refresh="!isLoading"
    @refreshCategory="refresh">

    <vl-column v-if="noData" width="12">
      <div v-if="isLoading" v-vl-align:center>
        <vl-loader message="De status van de register synchronisatie wordt opgevraagd. " />
      </div>
      <vl-alert
        v-else
        title="Register synchronisatie status ophalen is mislukt"
        content="Er is iets fout gelopen tijdens het ophalen van de status van de register synchronisatie. Probeer het later opnieuw."
        mod-error />
    </vl-column>
    
    <status-item
      v-for="syndication in syndications"
      :key="syndication.name"
      :item-id="createItemId(syndication.name)"
      :alert-level="syndication.alertLevel"
      class="syndication">
      <div class="name">{{ formatName(syndication.name) }}</div>
      <div v-if="syndication.progress" class="progress --right">
        {{ isStillProcessing(syndication.progress) ? formatProgress(syndication.progress) : '100%' }}
      </div>
      <div v-else class="progress vl-alert vl-alert--error --right ">Er is iets fout gelopen tijdens het ophalen van de syndication-bron status.</div>
    </status-item>
  </status-category>
</template>

<style lang="scss">
  .vl-status__item.syndication {
    .name {
      padding-right: 0.5em;
    }

    .state::before {
      font-family: "vlaanderen-icon";
      content: "\F21F";
      padding-right: 1rem;
    }

    .progress {
      margin-right: 0.5em;
    }

    .progress.vl-alert {
      padding: 0.2em 0.5em;
    }
  }
</style>

<script>
import StatusCategory from './StatusCategory.vue';
import StatusItem from './StatusItem.vue';
import {
  createSyndicationStatusModel,
  aggregateAlertLevel,
  capitalizeFirstCharacter,
} from './transform.js';

const formatName = (name = '') => capitalizeFirstCharacter(name);

const sortFormatedName = (a, b) => {
  const displayNameA = formatName(a.name);
  const displayNameB = formatName(b.name);

  return displayNameA.localeCompare(displayNameB);
};

export default {
  name: 'SyndicationStatus',
  components: {
    StatusItem,
    StatusCategory,
  },
  props: {
    registeryId: {
      type: String,
      required: true,
    },
    status: { 
      type: Object, 
      required: false,
      default: null,
    },
    streamPositions: {
      type: Object,
      required: false,
      default: null,
    },
    isLoading: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  computed: {
    categoryId: function() {
      return `${this.registeryId}_syndication`.toLocaleLowerCase();
    },
    noData: function() {
      return !this.status || !this.status.syndications || this.status.syndications.length == 0;
    },
    alertLevel: function() {
      return this.noData ? 'none' : aggregateAlertLevel(this.syndications);
    },
    syndications: function() {
      return this.noData ? [] : this
        .status
        .syndications
        .map(syndication => createSyndicationStatusModel(syndication, this.getStreamPositionFor))
        .sort(sortFormatedName);
    },
  },
  methods: {
    formatName,
    formatProgress: (progress = {}) => 
      progress.percentage > 95 
        ? `${progress.position.toLocaleString('nl-BE')}/${progress.streamPosition.toLocaleString('nl-BE')}`
        : `${Number.parseFloat(progress.percentage).toFixed(2)}%`,
    refresh: function () {
      this.$emit('refresh');
    },
    stateTooltipDescriptionFor: state => {
      if (state === 'active') {
        return 'Actief';
      }
      if (state === 'stopped') {
        return 'Gepauzeerd';
      }
      if (state === 'error') {
        return 'Fout';
      }
      return '';
    },
    getStreamPositionFor: function(syndicationSourceName = '') {
      if (!this.streamPositions) {
        return NaN;
      }

      const sourceName =  syndicationSourceName
        .replace(/addresslink$/i, '')
        .replace(/buildingunit/i, 'building')
        .replace(/postalinfo/i, 'postal');

      return this.streamPositions[sourceName  + 'Registry'] || NaN;
    },
    isStillProcessing: function (progress) {
      // last event will almost always be a CRAB event which is not exposed, so 1 event behind is considered caught up.
      return progress && progress.isBehind && progress.relativePosition < -1;
    },
    createItemId: function(itemId) {
      return `${this.categoryId}_${itemId}`
        .replace(/\./g, '-')
        .toLocaleLowerCase();
    },
  },
};
</script>
