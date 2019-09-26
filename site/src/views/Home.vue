<template>
  <vl-page>
    <main id="main" itemprop="mainContentOfPage">
      <vl-region>
        <vl-layout>
          <IntroductionHero />
        </vl-layout>
      </vl-region>

      <vl-region mod-alt>
        <vl-layout>
          <vl-grid>
            <vl-column width="4" width-s="12">
              <vl-spotlight title="Algemeen" subtitle="Wat zijn de basisregisters?" href="#" />
            </vl-column>
            <vl-column width="4" width-s="12">
              <vl-spotlight
                title="Aanleiding"
                subtitle="Waarom een stelsel van basisregisters?"
                href="#"
              />
            </vl-column>
            <vl-column width="4" width-s="12">
              <vl-spotlight title="Visie" subtitle="Wie werkt mee?" href="#" />
            </vl-column>
          </vl-grid>
        </vl-layout>
      </vl-region>

      <vl-region>
        <vl-layout>
          <vl-grid>
            <vl-column width="4" width-s="12">
              <vl-spotlight
                title="Release notes"
                subtitle="Documentatie bij huidige en vorige releases"
                href="#"
                mod-small
              />
            </vl-column>
            <vl-column width="4" width-s="12">
              <vl-spotlight
                title="Veelgestelde vragen"
                subtitle="Veelgestelde vragen (en de bijhorende antwoorden) over de basisregisters"
                href="#"
                mod-small
              />
            </vl-column>
          </vl-grid>
        </vl-layout>
      </vl-region>

      <vl-region mod-alt>
        <vl-layout>
          <vl-grid>
            <vl-column width="12" width-s="12">
              <vl-title tag-name="h2">Nieuws</vl-title>
            </vl-column>

            <vl-column width="12" width-s="12">
              Border?
              <vl-grid>
                <vl-column width="12" width-s="12">Iets van nieuws</vl-column>
              </vl-grid>
            </vl-column>
          </vl-grid>
        </vl-layout>
      </vl-region>
    </main>
  </vl-page>
</template>

<script>
import IntroductionHero from "@/components/IntroductionHero.vue";

export default {
  name: "home",
  components: {
    IntroductionHero
  }
};
</script>
