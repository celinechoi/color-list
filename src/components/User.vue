<template>
	<div class="contents">
		<ul class="frame-img">
			<li v-for="(user, idx) in users" :key="idx">
				<h2>{{ user.first_name }}</h2>
				<img :src="`${user.avatar}`" alt="" />
			</li>
		</ul>
	</div>
</template>

<script>
import axios from 'axios';
export default {
	data() {
		return {
			users: null,
			totalPage: null,
			pageNum: 1,
		};
	},
	methods: {
		fetchData(pageNum) {
			axios
				.get('https://reqres.in/api/users?page=' + this.pageNum)
				.then(res => {
					this.users = res.data.data;
					this.totalPage = res.data.total_pages;
				})
				.catch(err => {
					console.log(err);
				});
		},
	},
	created() {
		this.fetchData(this.pageNum);
	},
};
</script>

<style></style>
