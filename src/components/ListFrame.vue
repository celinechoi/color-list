<template>
	<div class="contents">
		<!-- <ul class="frame-header">
			<li class="frame-header__title">식당명</li>
			<li class="frame-header__place01">시도명</li>
			<li class="frame-header__place02">시군구명</li>
		</ul> -->
		<h2 class="list-title">users</h2>
		<ul class="frame-contents">
			<li class="frame-contents__list" v-for="(user, idx) in users" :key="idx">
				<a href="javascript:;" class="frame-contents__link">
					<img :src="`${user.avatar}`" alt="" />
					<p>{{ user.first_name }}</p>
				</a>
			</li>
		</ul>
		<Paging: totalPage="totalPage" @movePage="movePage" />
	</div>
</template>

<script>
import axios from 'axios';
import Paging from './Paging';
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
					const dataTxt = res.data;
					this.users = dataTxt.data;
					this.totalPage = dataTxt.total_pages;
					console.log(dataTxt.data);
				})
				.catch(err => {
					console.log(err);
				});
		},
		movePage(page) {
			this.fetchData(page);
		},
	},
	created() {
		this.fetchData(this.pageNum);
	},
	components: {
		Paging,
	},
};
</script>

<style></style>
