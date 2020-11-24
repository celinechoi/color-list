<template>
	<div id="app">
		<HeaderFrame></HeaderFrame>
		<SearchFrame></SearchFrame>
		<ListFrame></ListFrame>
		<FooterFrame></FooterFrame>
	</div>
</template>

<script>
import HeaderFrame from './components/common/HeaderFrame';
import SearchFrame from './components/common/SearchFrame';
import ListFrame from './components/ListFrame';
import FooterFrame from './components/common/FooterFrame';

export default {
	name: 'App',
	components: {
		HeaderFrame,
		SearchFrame,
		ListFrame,
		FooterFrame,
	},
};
</script>

<style lang="scss">
@import 'http://fonts.googleapis.com/earlyaccess/notosanskr.css';
@import '~vue-ionicons/ionicons.scss';
@import './assets/styles/reset.css';
@import '@/assets/styles/style.scss';
@import '@/assets/styles/media_query.scss';
</style>
