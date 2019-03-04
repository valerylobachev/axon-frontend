<template>
  <q-layout view="hHh Lpr lFf" class="bg-grey-2">
    <q-header elevated>
      <q-toolbar>
        <q-btn flat dense round @click="toggleLeftDrawer()" aria-label="Menu">
          <q-icon name="menu"/>
        </q-btn>

        <q-toolbar-title>
          Annette Axon
        </q-toolbar-title>


        <q-btn-dropdown flat stretch  no-caps :label="appState.language.toLocaleUpperCase()" >
          <q-list>
            <q-item clickable v-close-menu
                    v-for="lang in appState.languages"
                    :key="lang"
                    @click="setLanguage(lang)"
                    :active="lang === appState.language">
              <q-item-section>
                <q-item-label>{{ lang.toUpperCase() }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>

        <q-btn-dropdown flat stretch  no-caps :label="username" icon="fas fa-user">
          <q-list>
            <q-item clickable v-close-menu @click="$keycloak.accountManagement()">
              <q-item-section avatar>
                <q-icon name="fas fa-user" />
              </q-item-section>
              <q-item-section>
                <q-item-label>{{ $t('annette.appHeader.profile') }}</q-item-label>
              </q-item-section>
            </q-item>

            <q-item clickable v-close-menu @click="$keycloak.logout()">
              <q-item-section avatar>
                <q-icon name="fas fa-power-off" />
              </q-item-section>
              <q-item-section>
                <q-item-label>{{ $t('annette.appHeader.logout') }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" bordered content-class="bg-white">
      <app-menu></app-menu>
    </q-drawer>

    <q-page-container>
      <router-view/>
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
  import {Component, Vue} from "vue-property-decorator";
  import {Action, Getter, Mutation, State} from "vuex-class";
  import {AppState} from '../store/app/state';
  import AppMenu from './AppMenu.vue';

  const namespace = "app";

  @Component({
    components: {
      AppMenu,
    }
  })
  class MyLayout extends Vue {

    @State('app') appState: AppState;
    @Action('SetLanguage', { namespace }) setLanguage: any;
    @Getter("leftDrawerOpen", {namespace}) leftDrawerOpen;
    @Mutation("ToggleLeftDrawer", {namespace}) toggleLeftDrawer;

    get username() {
      const profile = this.appState.profile
      if (profile && this.$q.screen.gt.sm) {
        return profile.firstName + ' ' + profile.lastName;
      } else {
        return '';
      }
    }
  }

  export default MyLayout;
</script>

<style></style>
