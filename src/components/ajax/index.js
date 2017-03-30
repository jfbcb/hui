import form from './form.vue';
import button from './button.vue';
import {defaultPrefix} from '../../utils/config'

const components = {
	form,button
};

export default {
	install(Vue, prefix){
		prefix = prefix || defaultPrefix;
		for (let item of Object.values(components)) {
			Vue.component(prefix + item.name, item)
		}
	}
}
