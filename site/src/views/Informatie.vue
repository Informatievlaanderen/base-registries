<template>
  <vl-page>
    <vl-region mod-no-space-bottom>
      <vl-layout>
        <header class="wp-pt-heading">
          <div class="wp-pt-heading__parent">
            <vl-link to="/informatie" mod-bold>Informatie</vl-link>
          </div>

          <div class="wp-pt-heading__title-wrapper">
            <vl-title tag-name="h1" class="wp-pt-heading__title">Basisregisters Vlaanderen</vl-title>
          </div>

          <vl-grid>
            <vl-column width="9" width-s="12">
              <div class="wp-pt-heading__content">
                <vl-typography>
                  <vl-introduction>
                    Bent u op zoek naar authentieke gegevensbronnen? Dan bent u bij
                    <strong>Informatie Vlaanderen</strong> aan het juiste adres.
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
                  <vl-title tag-name="h2" id="algemeen">Wat is een basisregisters?</vl-title>

                  <vl-typography>
                    <p>Bla</p>
                  </vl-typography>
                </vl-column>

                <vl-column width="12">
                  <vl-title tag-name="h2" id="aanleiding">Aanleiding voor de basisregisters</vl-title>

                  <vl-typography>
                    <p>Bla</p>
                  </vl-typography>
                </vl-column>

                <vl-column width="12">
                  <vl-title tag-name="h2" id="visie">Visie op de basisregisters</vl-title>

                  <vl-typography>
                    <p>Bla</p>
                  </vl-typography>
                </vl-column>

                <vl-column width="12">
                  <vl-title tag-name="h2" id="aanbod">Aanbod van gegevensbronnen</vl-title>

                  <vl-typography>
                    <p>Bla</p>
                  </vl-typography>
                </vl-column>
              </vl-grid>
            </vl-column>

            <vl-column
              width="3"
              push="1"
              push-m="reset"
              width-s="12"
              class="wp-pt-side-navigation wp-pt-side-navigation--sticky-parent"
            >
              <aside class="wp-pt-side-navigation--sticky" style="top: 120px;">
                <vl-side-navigation title="Op deze pagina">
                  <vl-side-navigation-list>
                    <vl-side-navigation-item href="#algemeen" text="Algemeen" />
                    <vl-side-navigation-item href="#aanleiding" text="Aanleiding" />
                    <vl-side-navigation-item href="#visie" text="Visie" />
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
