<template>
	<div>
		<h1>user Info</h1>
	</div>
</template>

<script>
import axios from 'axios';
export default {
	data() {
		return {
			users: null,
			totalPage: 100,
		};
	},
	methods: {
		fetchData() {
			axios
				.get(
					'http://211.237.50.150:7080/openapi/98a480e9619927c6880e3376f7d6d3e28581027b6dafdfdbfe3c9553cca7cb7a/xml/Grid_20200713000000000605_1/1/100',
					true,
				)
				.then(res => {
					console.log(res);
				})
				.catch(err => {
					console.log(err);
				});
		},
	},
	created() {
		this.fetchData();
	},
};
</script>

<style></style>
