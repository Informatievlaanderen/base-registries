<template>
  <vl-page>
    <vl-region mod-no-space-bottom>
      <vl-layout>
        <header class="wp-pt-heading">
          <div class="wp-pt-heading__title-wrapper">
            <vl-title tag-name="h1" class="wp-pt-heading__title">Foutmelding: {{ errorDetail.id }}</vl-title>
          </div>
        </header>
      </vl-layout>
    </vl-region>

    <vl-main>
      <vl-region>
        <vl-layout>
          <vl-grid mod-stacked>
            <vl-column width="12">
              <vl-grid mod-stacked>
                <vl-column v-if="!responseStatus" width="12">
                  <div v-vl-align:center>
                    <vl-loader message="De foutmelding details worden opgevraagd" />
                  </div>
                </vl-column>
                <vl-column 
                  v-else 
                  width="12">
                  <vl-typography v-if="responseStatus==200">
                    {{ errorDetail }}
                  </vl-typography>
                  <vl-alert
                    v-else-if="responseStatus==404"
                    title="Foutmelding niet gevonden"
                    :content="'Er werden geen details gevonden voor fout: ' + errorDetail.id"
                    mod-error />
                  <vl-alert
                    v-else
                    title="Foutmelding details ophalen mislukt"
                    content="Er is iets fout gelopen tijdens het ophalen van de foutmelding details. Probeer later opnieuw."
                    mod-error />
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
import axios from 'axios';

export default {
  name: 'ErrorDetail',

  data () {
    return {
      responseStatus: null,
      errorDetail: {
        id: this.$route.params.fout,
        content: {},
      },
    };
  },

  mounted () {
    axios
      .get(window.baseRegistriesApi + '/v1/foutmeldingen/' + this.errorDetail.id)
      .then(({ data = {}, status = 500 }) => {
        this.errorDetail.content = data;
        this.responseStatus = status;
      })
      .catch(error => {
        let { response: { status = 500 } } = error;
        this.responseStatus = status;
        console.log(`Could not retrieve error details: ${this.errorDetail.id}.` , error);
      });
  },
};
</script>
