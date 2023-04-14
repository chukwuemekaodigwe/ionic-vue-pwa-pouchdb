import { createAuth0 } from "@auth0/auth0-vue";
import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router';
import store from './vuex';
import VueNumberFormat from 'vue-number-format'



//import { defineCustomElements } from '@ionic/pwa-elements/loader';


import { IonicVue } from '@ionic/vue';
/* Core CSS required for Ionic components to work properly */
import '@ionic/vue/css/core.css';
/* Basic CSS for apps built with Ionic */
import '@ionic/vue/css/normalize.css';
import '@ionic/vue/css/structure.css';
import '@ionic/vue/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/vue/css/padding.css';
import '@ionic/vue/css/float-elements.css';
import '@ionic/vue/css/text-alignment.css';
import '@ionic/vue/css/text-transformation.css';
import '@ionic/vue/css/flex-utils.css';
import '@ionic/vue/css/display.css';
/* Theme variables - copied from existing project */
import './theme/variables.css';


const app = createApp(App)
  .use(IonicVue)
  .use(router)
  .use(store)
  
  .use(
    createAuth0({
      domain: import.meta.env.VITE_AUTH0_DOMAIN,
      client_id: import.meta.env.VITE_AUTH0_CLIENT_ID,
      redirect_uri: import.meta.env.VITE_AUTH0_CALLBACK_URL,
    })
  )
router.isReady().then(() => {
  app.mount('#app');
});

document.addEventListener('deviceready', function () {
  if (/Android/i.test(navigator.userAgent)) {
    delete window.sqlitePlugin;
  }
}, false);

// Call the element loader after the platform has been bootstrapped
//defineCustomElements(window);