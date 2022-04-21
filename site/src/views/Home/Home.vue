<template>
  <vl-page>
    <vl-main>
      <vl-region>
        <vl-layout>
          <IntroductionHero />
        </vl-layout>
      </vl-region>

      <vl-region>
        <vl-layout>
          <vl-grid>
            <vl-column width="4" width-s="12">
              <vl-spotlight
                title="Implementatiemodel"
                subtitle="De specificatie voor gegevensuitwisseling"
                to="/implementatiemodel"
                tag-name="router-link"
                mod-small />
            </vl-column>    
          </vl-grid>
        </vl-layout>
      </vl-region>

    </vl-main>
  </vl-page>
</template>

<script>
import IntroductionHero from './IntroductionHero.vue';

export default {
  name: 'Home',
  components: {
    IntroductionHero,
  },
};
</script>
