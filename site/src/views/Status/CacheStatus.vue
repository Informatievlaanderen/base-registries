<template>
  <status-category
    :title="'Cache'"
    :alert-level="alertLevel"
    :show-refresh="!isLoading"
    @refreshCategory="refresh">

    <vl-column v-if="noData" width="12">
      <div v-if="isLoading" v-vl-align:center>
        <vl-loader message="De status van de caches wordt opgevraagd" />
      </div>
      <vl-alert
        v-else
        title="Status caches ophalen is mislukt"
        content="Er is iets fout gelopen tijdens het ophalen van de status van de caches. Probeer later opnieuw."
        mod-error />
    </vl-column>

    <status-item
      v-for="cache in caches"
      :key="cache.name"
      :alert-level="cache.alertLevel">
      <div class="cache-name cache-state">{{ cache.name }}</div>
      <div v-if="cache.numberOfRecordsToProcess > 0" class="--right">aantal niet gecachte objecten: {{ cache.numberOfRecordsToProcess }}</div>
    </status-item>

  </status-category>
</template>

<style lang="scss">
</style>

<script>
import StatusCategory from './StatusCategory.vue';
import StatusItem from './StatusItem.vue';
import { createCacheStatusModel, aggregateAlertLevel } from './transform.js';

export default {
  name: 'CacheStatus',
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
      return this.noData ? 'none' : aggregateAlertLevel(this.caches);
    },
    caches : function () {
      return (this.status || []).map(createCacheStatusModel);
    },
  },
  methods: {
    refresh: function () {
      this.$emit('refresh');
    },
  },
};
</script>
