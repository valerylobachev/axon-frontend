declare module "quasar"
declare module "quasar/lang/ru"

declare module "*.vue" {
  const content: any;
  export default content;
}

// Defined in webpack DefinePlugin
declare var PROD: boolean;
declare var DEV: boolean;
declare var __THEME: string;

declare function require(deps: string): any
declare function require(deps: string[], cb: any): any

export interface Vue {
  $q: typeof Object
}


import Vue from 'vue';
import VueI18n, {IVueI18n} from 'vue-i18n'
import  VueRouter  from 'vue-router';
import * as Keycloak from 'keycloak-js';

declare module 'vue/types/vue' {
  interface Vue {
    $q: any
    $router: VueRouter
    readonly $i18n: VueI18n & IVueI18n;
    $t: typeof VueI18n.prototype.t;
    $tc: typeof VueI18n.prototype.tc;
    $te: typeof VueI18n.prototype.te;
    $d: typeof VueI18n.prototype.d;
    $n: typeof VueI18n.prototype.n;
    $keycloak: Keycloak.KeycloakInstance
  }
}
