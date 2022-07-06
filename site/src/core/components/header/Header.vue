<template>
  <header id="vlaanderen-top">
    <div id="vlaanderen-navigation">
      <a id="vlaanderen-link" :href="$l(`header.company.url`)" target="_self" @mouseover="onHover(true)" @mouseleave="onHover(false)">
        <div id="vlaanderen-top-logo"/>
        <div :class="vlaanderenTopLogoClass"/>
        <span v-l="`header.company.name`"></span>
      </a>
      <div id="home-navigation">
        <vl-link id="home-link" to="/">
          <span v-l="`header.brand`"></span>
        </vl-link>
      </div>
    </div>
    <div class="vlaanderen-actions">
      <div class="vlaanderen-actions-contact" @click="showContactPanel=!showContactPanel">
        <span>Hulp nodig</span>
        <vl-icon
          :style="{fontSize:'1.6em'}"
          class="ml-2"
          icon="question-mark"
        />
        <div v-if="showContactPanel" class="vlaanderen-actions-contact-expanded">
          <div class="contact-header-panel">
            <h1>Contacteer ons</h1>
          </div>
          <div class="contact-items">
            <a href="mailto:digitaal.vlaanderen@vlaanderen.be" class="contact-item">
              <div class="contact-item-icon">
                <vl-icon icon="mail" />
              </div>
              <div class="contact-item-content">
                <div class="contact-item-content-title">
                  Stuur een mail naar
                </div>
                <div class="contact-item-content-text">
                  digitaal.vlaanderen@vlaanderen.be
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script lang="ts">
import Vue from "vue"

export default Vue.extend({
  data() {
    return {
      showContactPanel: false,
      vlaanderenTopLogoClass: "vlaanderen-top-logo-overlay"
    } 
  },
  methods: {
    onHover(state: boolean): void {
      this.vlaanderenTopLogoClass = state ? "vlaanderen-top-logo-overlay vlaanderen-top-logo-overlay-yellow" : "vlaanderen-top-logo-overlay"
    }
  }
})
</script>


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
  overflow:hidden;

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
  width:70%;
  float:left;
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
#home-link:hover,
#vlaanderen-link:hover {
    color: #0055CC !important;
    text-decoration: underline !important;
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
  background-color: transparent;
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

.vlaanderen-top-logo-overlay {
  background-color: #fff !important;
  height: 68px;
  overflow: hidden;
  position: absolute;
  width: 47px;
  z-index: -1;
  top: -11px;
  left: -11px;
  transform: rotate(-20deg);
}
.vlaanderen-top-logo-overlay-yellow {
  background-color: #FFE615 !important;
}

.vlaanderen-actions {
  float:right;
  width:20%;
  height:44px;
  margin: 0;
  padding:0;
}

.vlaanderen-actions-contact {
  position: relative;
  font-size: 1em;
  right: 0;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  text-transform: uppercase;
  font-size: 14px;
  font-weight: 500;
  line-height: 1;
  color: #333;
  background: #FFE615;
  width: 125px;
  float: right;
  padding: 5px;
  cursor: pointer;
}
.vlaanderen-actions-contact::after {
  content: "";
  position: absolute;
  top: 0;
  left: -13px;
  width: 0;
  height: 0;
  border-top: 0 solid transparent;
  border-bottom: 43px solid transparent;
  border-right: 13.5px solid #FFE615;
  transition: border-color 0.2s ease-in-out;
}

.vlaanderen-actions-contact:hover {
  text-decoration-line: underline;
}

.vlaanderen-actions-contact-expanded {
  cursor: default;
}

.vlaanderen-actions-contact-expanded {
  position: fixed;
  width:300px;
  height:125px;
  top:50px;
  right:0px;
  box-shadow: 0 0 20px rgb(0 0 0 / 20%);
  background: white;

  .contact-header-panel {
    height: 56px;
    background: #fff;
    border-bottom: 1px #cbd2da solid;
    padding: 18px 15px;
    font-weight: 500;

    h1 {
      color: #333332;
      font-size: 18px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }

  .contact-items {
    padding:15px;

    .contact-item {
      color: #0055CC;
      display: flex;
      text-decoration: none !important;

      .contact-item-icon {
        font-size:32px;
        margin-right:10px;
      }

      .contact-item-content {
        overflow:hidden;
        
        .contact-item-content-title {
          font-size: 16px;
          text-transform: none;
          margin-bottom:3px;
          text-decoration: none !important;
        }
        .contact-item-content-text {
          font-size: 14px;
          color: #333332;
          font-weight: 400;
          text-transform: none;
          text-decoration: none !important;
        }
      }
    }
    .contact-item:hover {
      .contact-item-content {
        .contact-item-content-title {
          text-decoration: underline !important;
        }
      }
    }
  }
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
