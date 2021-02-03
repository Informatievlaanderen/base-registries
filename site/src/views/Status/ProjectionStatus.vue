<template>
  <status-category
    :title="'Projecties'"
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

    
    <status-item v-for="projection in projections" :key="projection.name" :alert-level="projection.alertLevel">
      <div :class="`projection-name projection-state tooltip-on-hover ${projection.state}`">
        <tooltip :text="stateTooltipDescriptionFor(projection.state)" />
        {{ formatName(projection.name) }}
      </div>
      <div class="progress --right">{{ projection.progress.isBehind ? formatProgress(projection.progress) : '100%' }}</div>
    </status-item>

  </status-category>
</template>

<style lang="scss">
  .projection-name {
    padding-right: 0.5em;
  }

  .projection-state::before {
    font-family: "vlaanderen-icon";
    content: "\F21F";
    padding-right: 1rem;
  }

  .projection-state.stopped::before {
    content: "\F204";
  }

  .projection-state.active::before {
    content: "\F214";
  }

  .projection-state.error::before {
    content: "\F109";
  }

  .progress {
    margin-right: 0.5em;
  }
</style>

<script>
import Tooltip from '../../components/Tooltip.vue';
import StatusCategory from './StatusCategory.vue';
import StatusItem from './StatusItem.vue';
import { createProjectionStatusModel, aggregateAlertLevel } from './transform.js';

const formatName = (name = '') => {
  const parts = name.split('.');
  const projection = parts.pop();
  parts.pop();
  const category = parts.pop();
  return `${category} - ${projection}`
    .replace(/Projections/ig, '')
    .replace(/^ - /, '');
};

const sortFormatedName = (a, b) => {
  const displayNameA = formatName(a.name);
  const displayNameB = formatName(b.name);
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
    noData: function() {
      return !this.status || !this.status.projections || this.status.projections.length == 0;
    },
    alertLevel: function() {
      return this.noData ? 'none' : aggregateAlertLevel(this.projections);
    },
    projections: function() {
      return this.noData ? [] : this
        .status
        .projections
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
  },
};
</script>
