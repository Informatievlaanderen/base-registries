<template>
  <vl-page>
    <vl-region mod-no-space-bottom>
      <vl-layout>
        <header class="wp-pt-heading">
          <div class="wp-pt-heading__parent">
            <vl-link to="/" mod-bold>Overzicht</vl-link>
          </div>

          <div class="wp-pt-heading__title-wrapper">
            <vl-title tag-name="h1" class="wp-pt-heading__title">Implementatiemodel</vl-title>
          </div>

          <vl-grid>
            <vl-column width="9" width-s="12">
              <div class="wp-pt-heading__content">
                <vl-typography>
                  <vl-introduction>
                    Hoe zit het stelsel <strong>semantisch</strong> in elkaar? Bekijk de implementatiemodellen!
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
            <vl-column width="8" width-m="9" width-s="12">
              <vl-grid mod-stacked>
                <vl-column width="12">
                  <vl-title id="waarom" tag-name="h2">Waarom maken we dit?</vl-title>

                  <vl-typography>
                    <p>
                      Semantische afstemming zorgt er voor dat informatiemodellen gebruik maken van eenduidige termen waar een bijbehorende definitie kan voor opgezocht worden. 
                      Dit komt interoperabiliteit tussen toepassingen ten goede door dubbelzinnigheid en onduidelijkheid te elimineren. 
                      Daarnaast zorgt het voor breder gedragen informatiemodellen door silodenken te vermijden.
                    </p>
                  </vl-typography>
                </vl-column>

                <vl-column width="12">
                  <vl-title id="wat" tag-name="h2">Wat is een implementatiemodel precies?</vl-title>
                  <vl-typography>
                    <p>
                      Een implementatiemodel is een specificatie voor gegevensuitwisseling voor applicaties die een bepaalde use case vervullen. 
                      Het laat toe om naast een gedeelde semantiek ook bijkomende restricties op te leggen, zoals het vastleggen van kardinaliteiten of het gebruik van bepaalde codelijsten. 
                      Een implementatiemodel kan dienen als documentatie voor analisten en ontwikkelaars.
                    </p>
                  </vl-typography>
                </vl-column>

                <vl-column width="12">
                  <vl-title id="aanbod" tag-name="h2">Aanbod van implementatiemodellen</vl-title>

                  <vl-typography class="vl-u-spacer--medium ">
                    <p>Volgende implementatiemodellen maken momenteel deel uit van het stelsel:</p>
                  </vl-typography>

                  <vl-grid mod-stacked>
                    <vl-column width="6" width-s="12">
                      <vl-doormat
                        title="Adressenregister"
                        tag-name="router-link"
                        to="implementatiemodel/adressenregister" />
                    </vl-column>

                    <vl-column width="6" width-s="12">
                      <vl-doormat
                        title="Gebouwenregister"
                        tag-name="router-link"
                        to="implementatiemodel/gebouwenregister" />
                    </vl-column>
                  </vl-grid>
                </vl-column>
              </vl-grid>
            </vl-column>

            <vl-column
              width="3"
              push="1"
              push-m="reset"
              width-s="12"
              class="wp-pt-side-navigation wp-pt-side-navigation--sticky-parent">
              <aside class="wp-pt-side-navigation--sticky" style="top: 120px;">
                <vl-side-navigation title="Op deze pagina">
                  <vl-side-navigation-list>
                    <vl-side-navigation-item href="#waarom" text="Waarom" />
                    <vl-side-navigation-item href="#wat" text="Wat" />
                    <vl-side-navigation-item href="#aanbod" text="Aanbod" />
                  </vl-side-navigation-list>
                </vl-side-navigation>
              </aside>
            </vl-column>
          </vl-grid>
        </vl-layout>
      </vl-region>
    </vl-main>
  </vl-page>
</template>
