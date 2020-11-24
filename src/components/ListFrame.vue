<template>
	<div class="contents">
		<!-- <ul class="frame-header">
			<li class="frame-header__title">식당명</li>
			<li class="frame-header__place01">시도명</li>
			<li class="frame-header__place02">시군구명</li>
		</ul> -->
		<h2 class="list-title">colors</h2>
		<ul class="frame-contents">
			<li
				class="frame-contents__list"
				v-for="(product, idx) in products"
				:key="idx"
			>
				<a
					href="javascript:;"
					class="frame-contents__link"
					@click="showModal = true"
				>
					<div class="line-box">
						<span
							:style="{ 'background-color': product.color }"
							class="line left"
						></span>
						<span
							:style="{ 'background-color': product.color }"
							class="line center"
						></span>
						<span
							:style="{ 'background-color': product.color }"
							class="line right"
						></span>
					</div>
					<p>
						color code_
						<strong :style="{ color: product.color }">{{
							product.color
						}}</strong>
					</p>
				</a>
			</li>
		</ul>
		<Paging :totalPage="totalPage" @movePage="movePage" />
		<!-- @movePage는 자식 컴포넌트로 부터 받은 이벤트, "movePage"는 여기 컴포넌트의 메서드 실행. -->
		<!-- <Modal>
			<template v-slot:popupTitle>
				<h2>색상 자세히 보기</h2>
			</template>
			<template v-slot:popupContent>
				<div>내용</div>
			</template>
		</Modal> -->
		<Modal v-if="showModal">
			<template v-slot:modalHeader>
				<div class="modal-header">
					<h2>
						<p>모달타이틀</p>
						<button @click="showModal = false">닫기</button>
					</h2>
				</div>
			</template>
			<template v-slot:modalContents>
				<div class="modal-contents">
					모달컨텐츠
				</div>
			</template>
		</Modal>
	</div>
</template>

<script>
import axios from 'axios';
import Paging from './common/Paging';
import Modal from './common/Modal';
export default {
	components: {
		Paging,
		Modal,
	},
	data() {
		return {
			products: null,
			totalPage: null,
			pageNum: 1,
			showModal: false,
		};
	},
	methods: {
		fetchData(pageNum) {
			axios
				.get('https://reqres.in/api/products?page=' + pageNum)
				.then(res => {
					const dataTxt = res.data;
					this.products = dataTxt.data;
					this.totalPage = dataTxt.total_pages;
					console.log(res);
				})
				.catch(err => {
					console.log(err);
				});
		},
		// imgUrlError(e) { // 이미지 없을 경우 noimage show
		// 	e.path[0].src = require('../assets/img/noimg.jpg');
		// },
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
