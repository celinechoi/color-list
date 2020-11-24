<template>
	<transition name="modal">
		<div class="modal-mask">
			<div class="modal-wrapper">
				<div class="modal-container">
					<slot name="modalHeader">
						모달타이틀
					</slot>
					<slot name="modalContents">
						모달컨텐츠
					</slot>
				</div>
			</div>
		</div>
	</transition>
</template>

<script>
export default {};
</script>

<style></style>
