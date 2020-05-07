<template>
  <div id="app">
    <vl-header />

    <router-view />

    <vl-footer />
  </div>
</template>

<style lang="scss">
  @import './vlaanderen.scss';
  @import './vlaanderen-wp.scss';

  #app { padding-top: 30px; }

  .vl-title[id]::before {
    content: '';
    display: block;
    height: 45px;
    margin-top: -45px;
    visibility: hidden;
  }

  .vl-tooltip {
    max-width: 100em !important;
  }

  .vl-page {
    margin-top: 45px;
  }

  @media (max-width: 580px) {
    .vl-hero-navigation__list__listitem--active .vl-hero-navigation__title {
      text-decoration: none;
    }
  }
</style>
