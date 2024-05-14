const { defineConfig } = require('@vue/cli-service');
module.exports = defineConfig({
	transpileDependencies: true,
});

module.exports = {
	publicPath: '/scboard24',
	outputDir: 'docs',
};

// module.exports = {
// 	configureWebpack: {
// 		plugins: [
// 			new webpack.DefinePlugin({
// 				__VUE_PROD_HYDRATION_MISMATCH_DETAILS__: JSON.stringify(false),
// 			}),
// 		],
// 	},
// };
