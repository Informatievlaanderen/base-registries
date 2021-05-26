<template>
  <div :id="registeryId" class="registry-status">
    <h3 itemprop="name" class="vl-registry-status-item__title">{{ title }}</h3>
    <import-status
      v-if="!status.hide.includes('import')"
      :registery-id="registeryId"
      :status="status.import"
      :is-loading="status.isLoading.includes('import')"
       @refresh="refresh(['import'])" />
    <projection-status
      v-if="!status.hide.includes('projections')"
      :registery-id="registeryId"
      :status="status.projections"
      :is-loading="status.isLoading.includes('projections')"
      @refresh="refresh(['projections'])" />
    <feed-projection-status
      v-if="!status.hide.includes('feed')"
      :registery-id="registeryId"
      :status="status.projections"
      :is-loading="status.isLoading.includes('projections')"
      @refresh="refresh(['projections'])" />
    <syndication-status
      v-if="!status.hide.includes('syndication')"
      :registery-id="registeryId"
      :status="status.syndication"
      :stream-positions="status.streamPositions"
      :is-loading="status.isLoading.includes('syndication')"
      @refresh="refresh(['projections', 'syndication'])" />
    <cache-status
      v-if="!status.hide.includes('cache') && registeryId !== 'building'"
      :registery-id="registeryId"
      :status="status.cache"
      :is-loading="status.isLoading.includes('cache')"
      @refresh="refresh(['cache'])" />
  </div>
</template>

<style lang="scss">
  .vl-registry-status-item__title {
    color: #05c;
    font-weight: 500;
  }

  .vl-registry-status-item__type {
    margin-top: 0.5em;
  }
</style>

<script>
import ProjectionStatus from './ProjectionStatus.vue';
import FeedProjectionStatus from './FeedProjectionStatus.vue';
import CacheStatus from './CacheStatus.vue';
import ImportStatus from './ImportStatus.vue';
import SyndicationStatus from './SyndicationStatus.vue';

export default {
  name: 'RegistryStatus',
  components: { 
    ProjectionStatus,
    FeedProjectionStatus,
    CacheStatus,
    ImportStatus,
    SyndicationStatus,
  },
  props: {
    registeryId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    status: {
      type: Object,
      required: true,
    },
  },
  methods: {
    refresh: function(categories) {
      this.$emit('refresh', categories || []);
    },
  },
};
</script>
