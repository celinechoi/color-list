<template>
	<transition name="modal-toast">
		<div id="modal-mask">
			<slot name="modalHeader">
				모달타이틀
			</slot>
			<slot name="modalContents">
				모달컨텐츠
			</slot>
		</div>
	</transition>
</template>

<script>
export default {};
</script>

<style></style>
