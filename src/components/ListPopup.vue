<template>
	<div class="popup">
		<div class="popup__inner">
			<slot class="popup__title" name="popupTitle">popup title</slot>
			<slot class="popup__content" name="popupContent">
				popup content
			</slot>
		</div>
	</div>
</template>

<script>
export default {};
</script>

<style></style>
