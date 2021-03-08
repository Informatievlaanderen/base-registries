<template>
  <status-category
    title="Projecties"
    :category-id="categoryId"
    :alert-level="alertLevel"
    :show-refresh="!isLoading"
    @refreshCategory="refresh">

    <vl-column v-if="noData" width="12">
      <div v-if="isLoading" v-vl-align:center>
        <vl-loader message="De status van de projecties wordt opgevraagd. " />
      </div>
      <vl-alert
        v-else
        title="Projecties status ophalen is mislukt"
        content="Er is iets fout gelopen tijdens het ophalen van de status van de projecties. Probeer het later opnieuw."
        mod-error />
    </vl-column>

    
    <status-item
      v-for="projection in projections"
      :key="projection.key"
      :item-id="createItemId(projection.key)"
      :alert-level="projection.alertLevel"
      class="projection">
      <div :class="`name state tooltip-on-hover ${projection.state}`">
        <tooltip :text="stateTooltipDescriptionFor(projection.state)" />
        {{ formatName(projection.name, projection.key) }}
      </div>
      <div class="progress --right">{{ projection.progress.isBehind ? formatProgress(projection.progress) : '100%' }}</div>
    </status-item>

  </status-category>
</template>

<style lang="scss">
  .vl-status__item.projection {
    .name {
      padding-right: 0.5em;
    }

    .state::before {
      font-family: "vlaanderen-icon";
      content: "\F21F";
      padding-right: 1rem;
    }

    .state.stopped::before {
      content: "\F204";
    }

    .state.active::before {
      content: "\F214";
    }

    .state.error::before {
      content: "\F109";
    }

    .progress {
      margin-right: 0.5em;
    }
  }
</style>

<script>
import Tooltip from '../../components/Tooltip.vue';
import StatusCategory from './StatusCategory.vue';
import StatusItem from './StatusItem.vue';
import { createProjectionStatusModel, aggregateAlertLevel } from './transform.js';

const formatName = (name = '', key = '') => {
  if (key && name !== key) {
    return name;
  }

  // name still contains the projection key: clean up the key
  const parts = name.split('.');
  const projection = parts.pop();
  parts.pop();
  const category = parts.pop();
  return `${category} - ${projection}`
    .replace(/Projections/ig, '')
    .replace(/^ - /, '');
};

const sortFormatedName = (a, b) => {
  const displayNameA = formatName(a.name, a.key);
  const displayNameB = formatName(b.name, b.key);
  const a_hasCategory = displayNameA.split('-').length > 1;
  const b_hasCategory = displayNameB.split('-').length > 1;

  return a_hasCategory == b_hasCategory
    ? displayNameA.localeCompare(displayNameB)
    : a_hasCategory ? 1 : -1;
};

export default {
  name: 'ProjectionStatus',
  components: {
    StatusItem,
    StatusCategory,
    Tooltip,
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
    isLoading: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  computed: {
    categoryId: function() {
      return `${this.registeryId}_projections`.toLocaleLowerCase();
    },
    noData: function() {
      return this.filteredProjections.length === 0;
    },
    alertLevel: function() {
      return this.noData ? 'none' : aggregateAlertLevel(this.projections);
    },
    filteredProjections: function() {
      return !this.status || !this.status.projections || !Number.isInteger(this.status.projections.length)
        ? []
        : this
          .status
          .projections
          .filter(projection => !/syndication/i.test(projection.name));
    },
    projections: function() {
      return this
        .filteredProjections
        .map(projection => createProjectionStatusModel(projection, this.status.streamPosition))
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
    createItemId: function(itemId) {
      return `${this.categoryId}_${itemId}`
        .replace(/\./g, '-')
        .toLocaleLowerCase();
    },
  },
};
</script>
