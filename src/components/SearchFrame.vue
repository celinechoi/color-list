<template>
	<div class="search-box">
		<div class="search-box__inner">
			<input type="text" class="search-box__input" />
			<a href="javascript:;" class="search-box__button">
				<IosSearchIcon></IosSearchIcon>
			</a>
		</div>
	</div>
</template>

<script>
import IosSearchIcon from 'vue-ionicons/dist/ios-search.vue';
export default {
	name: 'SearchFrame',
	components: {
		IosSearchIcon,
	},
};
</script>

<style></style>
