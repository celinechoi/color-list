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
		<Paging :totalPage="totalPage" @movePage="movePage" />
		<!-- @movePage는 자식 컴포넌트로 부터 받은 이벤트, "movePage"는 여기 컴포넌트의 메서드 실행. -->
	</div>
</template>

<script>
import axios from 'axios';
import Paging from './Paging';
export default {
	components: {
		Paging,
	},
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
				.get('https://reqres.in/api/users?page=' + pageNum)
				.then(res => {
					const dataTxt = res.data;
					this.users = dataTxt.data;
					this.totalPage = dataTxt.total_pages;
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
};
</script>

<style></style>
