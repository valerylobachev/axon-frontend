import Keycloak from 'keycloak-js';
import axios from 'axios';

console.log('Keycloak creating...');
//const keycloak: Keycloak.KeycloakInstance = Keycloak('/assets/keycloak.json');
const keycloak: Keycloak.KeycloakInstance = Keycloak('/web-api/keycloak');
console.log('Keycloak created');




function tokenInterceptor() {
  axios.interceptors.request.use(
    config => {
      // @ts-ignore
      return new Promise((resolve, reject) => {
        keycloak
          .updateToken(30)
          .success(() => {
            config.headers.Authorization = `Bearer ${keycloak.token}`;
            resolve(config);
          })
          .error(failure => {
            reject(`Failed to refresh the token, or the session has expired: ${failure}`);
          });
      });
    },
    error => {
      // @ts-ignore
      return Promise.reject(error);
    });
}

export default async ({router, store, Vue}) => {
  Vue.prototype.$keycloak = keycloak;
  console.log('store:')
  console.log(store)

  function authGuard(to, from, next) {
     console.log('router.beforeEach')
    // console.log(from)
    // console.log(to)
    if (!keycloak.authenticated) {
      console.log('Keycloak logging in');
      keycloak.login()
        .success(result => {
          console.log('Keycloak logged in');
          console.log(result);
          loggedIn()
          next();
        })
        .error(failure => {
          loggedOut()
          console.log('Keycloak login failure');
          console.log(failure);
        });
    } else {
       console.log('router.beforeEach: already authenticated')
      next()
    }
  }

  function loggedIn() {
    keycloak
      .loadUserProfile()
      .success(
        profile => {
          if (store) {
            store.dispatch('app/Login', profile)
          }
        }
      )
      .error(error => console.error(error));
  }

  function loggedOut() {
    if (store) {
      store.dispatch('app/Logout');
    }
  }


  // @ts-ignore
  return new Promise((resolve, reject) => {
    console.log('Keycloak initializing...');
    keycloak
      .init({onLoad: 'login-required'})
      .success(success => {
        console.log('Keycloak initialized...');
        console.log(success);
        router.beforeEach(authGuard);
        tokenInterceptor();
        loggedIn();
        resolve(success);
      })
      .error(failure => {
        console.log('Keycloak initialization failure...');
        console.log(failure);
        router.beforeEach(authGuard);
        loggedOut();
        reject(failure);
      });
  })
};
