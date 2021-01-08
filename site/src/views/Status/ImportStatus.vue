<template>
  <status-category
    :title="'CRAB import'"
    :alert-level="alertLevel"
    :show-refresh="!isLoading"
    @refreshCategory="refresh">

    <vl-column v-if="noData" width="12">
      <div v-if="isLoading" v-vl-align:center>
        <vl-loader message="De status van de CRAB import wordt opgevraagd." />
      </div>
      <vl-alert
        v-else
        title="CRAB import status ophalen is mislukt"
        content="Er is iets fout gelopen tijdens het ophalen van de status van de CRAB import. Probeer het later opnieuw."
        mod-error />
    </vl-column>

    <status-item
      v-for="importStatus in imports"
      :key="importStatus.name"
      :alert-level="importStatus.alertLevel">
      <div :class="`import-name import-state tooltip ${importStatus.state}`">
        {{ formatName(importStatus.name) }}
      </div>
      <div
        v-if="importStatus.state=='active'"
        class="import-period --right">
        Wijzingen van {{ formatDate(importStatus.from) }} tot {{ formatDate(importStatus.to) }} aan het importeren
      </div>
      <div
        v-else
        class="import-period --right">
        Laatste wijziging: {{ formatDate(importStatus.lastCompleted) }}
      </div>
    </status-item>

  </status-category>
</template>

<style lang="scss">
  .import-name {
    padding-right: 0.5em;
  }

  .import-state::before {
    font-family: "vlaanderen-icon";
    content: "\F21F";
    padding-right: 1rem;
  }

  .import-state.stopped::before {
    content: "\F24e";
  }

  .import-state.active::before {
    content: "\F214";
  }

  .tooltip.active::after {
    content: "actief";
  }

  .tooltip.stopped::after {
    content: "geplanned";
  }

  .import-period {
    margin-right: 0.5em;
  }
</style>

<script>
import StatusCategory from './StatusCategory.vue';
import StatusItem from './StatusItem.vue';
import { createImportStatusModel, aggregateAlertLevel } from './transform.js';

export default {
  name: 'ImportStatus',
  components: {
    StatusCategory,
    StatusItem,
  },
  props: {
    status: {
      type: Array,
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
      return !this.status || this.status.length == 0;
    },
    alertLevel: function() {
      return this.noData ? 'none' : aggregateAlertLevel(this.imports);
    },
    imports : function () {
      return (this.status || []).map(createImportStatusModel);
    },
  },
  methods: {
    formatName: (name = '') => name.replace(/^.+\.importer\.?/i, ''),
    formatDate: date => {
      const options = {
        year: '2-digit',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      };
      return date ? date.toLocaleString('nl-BE', options) : '__/ __/ __ --:--:--';
    },
    refresh: function () {
      this.$emit('refresh');
    },
  },
};
</script>
