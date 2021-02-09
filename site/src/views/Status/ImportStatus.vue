<template>
  <status-category
    title="Import"
    :category-id="categoryId"
    :alert-level="alertLevel"
    :show-refresh="!isLoading"
    @refreshCategory="refresh">

    <vl-column v-if="noData" width="12">
      <div v-if="isLoading" v-vl-align:center>
        <vl-loader message="De status van de import wordt opgevraagd." />
      </div>
      <vl-alert
        v-else
        title="Import status ophalen is mislukt"
        content="Er is iets fout gelopen tijdens het ophalen van de import status. Probeer het later opnieuw."
        mod-error />
    </vl-column>

    <status-item
      v-for="importStatus in imports"
      :key="importStatus.name"
      :item-id="createItemId(importStatus.name)"
      :alert-level="importStatus.alertLevel"
      class="import">
      <div :class="`name state tooltip-on-hover ${importStatus.state}`">
        <tooltip :text="stateTooltipDescriptionFor(importStatus.state)" />
        {{ formatName(importStatus.name) }}
      </div>
      <div
        v-if="importStatus.state=='active'"
        class="period --right">
        Wijzigingen van {{ formatDate(importStatus.from) }} tot {{ formatDate(importStatus.to) }} zijn nu aan het importeren.
      </div>
      <div
        v-else
        class="period --right">
        Laatste wijziging: {{ formatDate(importStatus.lastCompleted) }}
      </div>
    </status-item>

  </status-category>
</template>

<style lang="scss">
  .import.vl-status__item {
    .name {
      padding-right: 0.5em;
    }

    .state::before {
      font-family: "vlaanderen-icon";
      content: "\F21F";
      padding-right: 1rem;
    }

    .state.stopped::before {
      content: "\F24e";
    }

    .state.active::before {
      content: "\F214";
    }

    .period {
      margin-right: 0.5em;
    }
  }
</style>

<script>
import Tooltip from '../../components/Tooltip.vue';
import StatusCategory from './StatusCategory.vue';
import StatusItem from './StatusItem.vue';
import {
  createImportStatusModel,
  aggregateAlertLevel,
  capitalizeFirstCharacter,
} from './transform.js';

export default {
  name: 'ImportStatus',
  components: {
    StatusCategory,
    StatusItem,
    Tooltip,
  },
  props: {
    registeryId: {
      type: String,
      required: true,
    },
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
    categoryId: function() {
      return `${this.registeryId}_import`.toLocaleLowerCase();
    },
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
    formatName: (name = '') => {
      const importer = capitalizeFirstCharacter(name.replace(/^.+\.importer\.?/i, ''));
      return importer.length > 0
        ? `CRAB import - ${importer}`
        : 'CRAB import';
    },
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
    stateTooltipDescriptionFor: state => {
      if (state === 'active') {
        return 'Actief';
      }
      if (state === 'stopped') {
        return 'Gepland';
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
