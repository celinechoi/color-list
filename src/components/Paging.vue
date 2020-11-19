<template>
	<ul class="paging frame-contents">
		<li
			class="frame-contents__page"
			v-for="(page, idx) in totalPage"
			:key="idx"
			@click="movePage(page)"
		>
			{{ page }}
		</li>
	</ul>
</template>

<script>
export default {
	// data 상속
	props: ['totalPage'],
	data() {
		return {};
	},
	methods: {
		movePage(page) {
			// 이벤트 부모 컴포넌트로 올리기
			this.$emit('movePage', page);
			console.log(page);
		},
	},
};
</script>

<style></style>
