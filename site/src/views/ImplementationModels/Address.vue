<template>
  <vl-page>
    <vl-region mod-no-space-bottom>
      <vl-layout>
        <header class="wp-pt-heading">
          <div class="wp-pt-heading__parent">
            <vl-link to="/implementatiemodel" mod-bold>Implementatiemodel</vl-link>
          </div>

          <div class="wp-pt-heading__title-wrapper">
            <vl-title tag-name="h1" class="wp-pt-heading__title">Adressenregister</vl-title>
          </div>

          <vl-grid>
            <vl-column width="9" width-s="12">
              <div class="wp-pt-heading__content">
                <vl-typography>
                  <vl-introduction>
                    Dit implementatiemodel definieert een specificatie voor de uitwisseling van <strong>adresgegevens</strong> in de context van een adresregister.
                  </vl-introduction>
                </vl-typography>
              </div>
            </vl-column>
          </vl-grid>
        </header>
      </vl-layout>
    </vl-region>

    <vl-main>
      <vl-region>
        <vl-layout>
          <vl-grid mod-stacked>
            <vl-column width="12">
              <vl-grid mod-stacked>
                <vl-column width="12" v-if="!loaded && !error">
                  <div v-vl-align:center>
                    <vl-loader message="Het implementatiemodel wordt opgevraagd" />
                  </div>
                </vl-column>

                <vl-column width="12" v-if="error">
                  <vl-alert
                    title="Implementatiemodel ophalen mislukt"
                    content="Er is iets fout gelopen tijdens het ophalen van het implementatiemodel. Probeer later opnieuw."
                    mod-error />
                </vl-column>

                <vl-column width="4" width-m="6" width-s="12" v-if="loaded">
                  Bla!
                </vl-column>
              </vl-grid>
            </vl-column>
          </vl-grid>
        </vl-layout>
      </vl-region>
    </vl-main>
  </vl-page>
</template>

<script>
import axios from "axios";

export default {
  name: "applicationprofile-building",
  data () {
    return {
      loaded: false,
      error: false,
      profile: {
        last_change: "?",
      }
    }
  },
  mounted () {
    axios
      .get(window.baseRegistriesApi + "/v1/versions")
      .then(response => {
        this.versions = response.data;
        this.loaded = true;
      })
      .catch(error => {
        this.error = true;
        console.log("Could not get applicationprofile.", error);
      });
  }
};
</script>
