<template>
  <vl-content-header
    v-if="!isHomePage"
    class="my-11"
    :mod-context="false"
    :mod-large="true"
    :mod-actions="false"
    :mod-alt="true"
    :mod-show-mobile="true"
    :mod-half-image="true"
    sizes="100vw"
    :background="background"
  >
    <vl-content-header-entity :mod-small="false" :prefix="prefix" :title="title" />
  </vl-content-header>
  <header v-else class="my-11 vl-content-header vl-content-header--half-image vl-content-header--show-mobile">
    <div class="vl-content-header__wrapper">
      <picture class="vl-content-header__bg">
        <img sizes="100vw" :src="background.src" :srcset="background.srcset" :alt="background.alt" />
      </picture>
      <vl-layout>
        <div class="vl-content-header__content">
          <div class="vl-content-header__logo-wrapper pt-7">
            <vl-content-header-entity :mod-small="false" :prefix="prefix" title="" />
          </div>
        </div>
      </vl-layout>
    </div>
  </header>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  props: {
    isHomePage: {
      type: Boolean,
      default: false,
    },
    prefix: {
      type: String,
      default: "Basisregisters Vlaanderen",
    },
    title: {
      type: String,
      default: "Lorem Ipsum",
    },
  },
  computed: {
    background() {
      return {
        src: "//www.vlaanderen.be/sites/default/files/ip_acm/page_banner_wide_alt/header.jpg",
        srcset:
          "//www.vlaanderen.be/sites/default/files/ip_acm/page_banner_mobile_alt/header.jpg 320w, //www.vlaanderen.be/sites/default/files/ip_acm/page_banner_narrow/header.jpg 1024w, //www.vlaanderen.be/sites/default/files/ip_acm/page_banner_wide_alt/header.jpg 1600w",
        alt: "Content Header",
      };
    },
  },
});
</script>
