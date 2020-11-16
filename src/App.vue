<template>
	<div id="app">
		<SafeHeader></SafeHeader>
		<SafeSearch></SafeSearch>
		<SafeList></SafeList>
		<p>{{ getMsg }}</p>
		<button @click="onChangedMsg">Click</button>
		<Safeuser></Safeuser>
		<SafeFooter></SafeFooter>
	</div>
</template>

<script>
import SafeHeader from './components/SafeHeader';
import SafeSearch from './components/SafeSearch';
import SafeList from './components/SafeList';
import Safeuser from './components/Safeuser';
import SafeFooter from './components/SafeFooter';

export default {
	name: 'App',
	components: {
		SafeHeader,
		SafeSearch,
		SafeList,
		Safeuser,
		SafeFooter,
	},
	computed: {
		getMsg() {
			return this.$store.getters.getMsg;
		},
	},
	methods: {
		onChangedMsg() {
			this.$store.dispatch('callMutation', { newMsg: 'World !!' });
		},
	},
};
</script>

<style lang="scss">
@import 'http://fonts.googleapis.com/earlyaccess/notosanskr.css';
@import '~vue-ionicons/ionicons.scss';
@import './assets/styles/reset.css';
@import './assets/styles/style.scss';
</style>
