<template>
	<div id="app">
		<SafeHeader></SafeHeader>
		<SafeSearch></SafeSearch>
		<SafeList></SafeList>
		<SafeFooter></SafeFooter>
	</div>
</template>

<script>
import SafeHeader from './components/SafeHeader';
import SafeSearch from './components/SafeSearch';
import SafeList from './components/SafeList';
import SafeFooter from './components/SafeFooter';

export default {
	name: 'App',
	components: {
		SafeHeader,
		SafeList,
		SafeFooter,
		SafeSearch,
	},
};
</script>

<style lang="scss">
@import 'http://fonts.googleapis.com/earlyaccess/notosanskr.css';
@import '~vue-ionicons/ionicons.scss';
@import './assets/styles/reset.css';
@import './assets/styles/style.scss';
</style>
