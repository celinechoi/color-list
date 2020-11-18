import Vue from 'vue';
import App from './App.vue';
import store from './store';
import AllIosIcon from 'vue-ionicons/dist/ionicons-ios.js';

Vue.config.productionTip = false; //배포에 대한 팁 출력(true/false)

Vue.use(AllIosIcon);

new Vue({
	store,
	render: h => h(App),
}).$mount('#app');
