import Vue from 'vue';
import App from './App.vue';
import store from './store';

Vue.config.productionTip = false; //배포에 대한 팁 출력(true/false)

new Vue({
	store,
	render: h => h(App),
}).$mount('#app');
