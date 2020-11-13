module.exports = {
	css: {
		loaderOptions: {
			sass: {
				additionalData: `
          @import "@/assets/styles/_mixins.scss";
          @import "@/assets/styles/_variables.scss";
        `,
			},
		},
	},
	// ESLint 에러 화면에 표시되지 않게 하는 방법
	devServer: {
		overlay: false,
	},
};
