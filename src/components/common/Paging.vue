<template>
	<ul class="paging frame-contents">
		<li
			class="frame-contents__page"
			v-for="(page, idx) in totalPage"
			:key="idx"
			@click="movePage(page, idx)"
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
		movePage(page, idx) {
			// 이벤트 부모 컴포넌트로 올리기
			this.$emit('movePage', page);
			console.log('page', page, 'idx', idx);
			const list = document.querySelectorAll('.frame-contents__page'),
				$colorBlack = '#000',
				$colorGray04 = 'rgba(0, 0, 0, 0.4)';
			for (var i = 0; i < list.length; i++) {
				if (idx == i) {
					list[i].style.color = $colorBlack;
				} else {
					list[i].style.color = $colorGray04;
				}
			}
		},
	},
};
</script>

<style></style>
