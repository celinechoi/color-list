<template>
	<div id="app">
		<HeaderFrame></HeaderFrame>
		<SearchFrame></SearchFrame>
		<ListFrame></ListFrame>
		<Paging />
		<FooterFrame></FooterFrame>
	</div>
</template>

<script>
import HeaderFrame from './components/HeaderFrame';
import SearchFrame from './components/SearchFrame';
import ListFrame from './components/ListFrame';
import FooterFrame from './components/FooterFrame';

export default {
	name: 'App',
	components: {
		HeaderFrame,
		SearchFrame,
		ListFrame,
		Paging,
		FooterFrame,
	},
};
</script>

<style lang="scss">
@import 'http://fonts.googleapis.com/earlyaccess/notosanskr.css';
@import '~vue-ionicons/ionicons.scss';
@import './assets/styles/reset.css';
@import './assets/styles/style.scss';
</style>
