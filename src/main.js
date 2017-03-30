import Vue from 'vue'
import iView from 'iview'
import components from './components'
import dashboard from './pages/dashboard'

Vue.use(iView);
Vue.use(components);
window.Vue = Vue;

window.Wula = {
	dashboard
};
