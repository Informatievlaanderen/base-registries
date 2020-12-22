<template>
  <status-category
    :title="'Projecties'"
    :alert-level="alertLevel"
    class="vl-registry-status-item__type">
    <status-item v-for="projection in projections" :key="projection.name" :alert-level="projection.alertLevel">
      <div :class="`projection-name projection-state ${projection.state}`">{{ formatName(projection.name) }}</div>
      <div class="progress --right">{{ projection.progress.isBehind ? formatProgress(projection.progress) : '100%' }}</div>
    </status-item>
  </status-category>
</template>

<style lang="scss">
  .projection-name {
    padding-right: 0.5em;
    overflow-wrap: break-word;
  }

  .projection-state:before {
    font-family: "vlaanderen-icon";
    content: "\F21F";
    padding-right: 1rem;
  }

  .projection-state.stopped:before {
    content: "\F204";
  }

  .projection-state.active:before {
    content: "\F214";
  }

  .projection-state.error:before {
    content: "\F109";
  }

  .progress {
    margin-right: 0.5em;
  }
</style>

<script>
import StatusCategory from './StatusCategory.vue';
import StatusItem from './StatusItem.vue';
import { createProjectionStatusModel, aggregateAlertLevel } from './transform.js';

export default {
  name: 'RegistryStatus',
  components: {
    StatusItem,
    StatusCategory,
  },
  props: {
    status: { 
      type: Object, 
      required: false,
      default: null,
    },
  },
  computed: {
    alertLevel: function() {
      return aggregateAlertLevel(this.projections);
    },
    projections: function() {
      return !this.status ? [] : this
        .status
        .projections
        .map(projection => createProjectionStatusModel(projection, this.status.streamPosition));
    },
  },
  methods: {
    formatName: (name = '') => name.split('.').pop().replace(/Projections$/i, ''),
    formatProgress: (progress = {}) => 
      progress.percentage > 95 
        ? `${progress.position}/${progress.streamPosition}` 
        : `${Number.parseFloat(progress.percentage).toFixed(2)}%`,
  },
};
</script>
