import Vue from 'nativescript-vue'
import App from './components/App'
import { isAndroid, isIOS } from 'tns-core-modules/platform'

import VueDevtools from 'nativescript-vue-devtools'
import store from './store'

import RadSideDrawer from 'nativescript-ui-sidedrawer/vue';

import routes from "./routes";
import BackendService from "./services/BackendService"

if(TNS_ENV !== 'production') {
  Vue.use(VueDevtools)
}

import DateTimePicker from "nativescript-datetimepicker/vue";
Vue.use(DateTimePicker);
  
Vue.use(RadSideDrawer);

Vue.registerElement("PreviousNextView", () => require("nativescript-iqkeyboardmanager"). PreviousNextView)
Vue.registerElement("TextViewWithHint", () => require("nativescript-iqkeyboardmanager").TextViewWithHint)

// Prints Vue logs when --env.production is *NOT* set while building
Vue.config.silent = (TNS_ENV === 'production')

Vue.prototype.$isAndroid = isAndroid;
Vue.prototype.$isIOS = isIOS;

const backendService = new BackendService();

new Vue({
  store,
  render: h => h("frame", [h(backendService.isLoggedIn() ? routes.app : routes.login)]),
  mounted() {
    setTimeout(() => {
        //orientation.setOrientation('portrait')
        //orientation.disableRotation();
    },0)
}
}).$start()
