<template>
  <header id="vlaanderen-top">
    <div id="vlaanderen-navigation">
      <a id="vlaanderen-link" :href="$l(`header.company.url`)" target="_self">
        <div id="vlaanderen-top-logo"></div>
        <span v-l="`header.company.name`"></span>
      </a>
      <div id="home-navigation">
        <vl-link id="home-link" to="/">
          <span v-l="`header.brand`"></span>
        </vl-link>
      </div>
    </div>
    <div class="vlaanderen-action"></div>
  </header>
</template>

<style lang="scss" scoped>
@import url("./header.logos.css");

#vlaanderen-in-progress {
  border-top: 1px solid #cbd2da;
  text-align: center;
  background: #fef9e5;
  padding: 10px;
  margin-right: auto;
  margin-left: auto;
  align-items: center;
  justify-content: center;
}

#vlaanderen-in-progress .vl-alert__title {
  display: none !important;
}

#vlaanderen-in-progress .vl-alert__message {
  margin: 0;
}

#vlaanderen-in-progress .vl-alert__icon {
  margin-right: 1rem;
}

#vlaanderen-in-progress .vl-icon.vl-vi.vl-vi-warning::before {
  content: "\f27d";
}

#vlaanderen-top {
  position: fixed;
  z-index: 10004;
  left: 0;
  right: 0;
  top: 0;
  width: 100%;
  display: block;

  min-width: 768px;
  background: #fff;
  color: #333;
  border-bottom: 1px solid #cbd2da;
  font-size: 16px;
  font-family: "Flanders Art Sans", sans-serif;
  -webkit-text-size-adjust: none;
  font-smoothing: antialiased !important;
  text-rendering: optimizeLegibility;
}

#vlaanderen-navigation {
  white-space: nowrap;
}

#vlaanderen-link {
  display: inline-block;
  font-family: "Flanders Art Sans", sans-serif;
  font-weight: 500;
  text-decoration: none;
  outline: none;

  color: #333332;
  font-size: 1.1875em;
  line-height: 2.31579em;
  text-transform: none;
  transition: color 0.2s;
}

#vlaanderen-link:hover {
  color: #06c;
}

#home-navigation {
  display: inline-block;
  vertical-align: bottom;
  position: relative;
  white-space: nowrap;
}

#home-link {
  display: inline-block;
  position: relative;
  font-family: "Flanders Art Sans", sans-serif;
  font-weight: 500;
  text-decoration: none;
  outline: none;

  color: #333332;
  text-transform: uppercase;
  transition: color 0.2s;
  padding-left: 1.5em;
  margin-left: 1em;
  font-size: 0.875em;
  line-height: 3.14286em;
}

#home-link:hover {
  color: #06c;
}

#home-link:before {
  float: left;
  background-color: #cbd2da !important;
  transform: rotate(-20deg);
  transform-origin: top left;
  display: block;
  content: " ";
  position: absolute;
  left: 0;
  top: 10px;
  bottom: 10px;
  width: 1px;
}

#vlaanderen-top-logo {
  position: relative;
  width: 47px;
  background-color: #fff;
  overflow: hidden;
  transition: background-color 0.2s;
  float: left;
  margin-right: 5px;
  height: 44px;
  background-repeat: no-repeat;
  background-position: 11px center;
  background-image: var(--logo);
}

#vlaanderen-top-logo:after {
  content: "";
  display: block;
  position: absolute;
  left: 28px;
  top: -4px;
  height: 54px;
  width: 1px;
  background-image: none !important;
  background-color: #cbd2da;
  transform: rotate(-20deg);
  transform-origin: top left;
  background-image: var(--logo-after);
}

@media (max-width: 580px) {
  #home-link .home-link-vl {
    display: none !important;
  }
}
</style>

<style lang="scss" scoped>
.vlaanderen-action {
  position: absolute;
  top: 0;
  z-index: 9998;
  right: 0;
  max-height: 44px;
}
</style>
