const { defineConfig } = require('@vue/cli-service');
module.exports = defineConfig({
	transpileDependencies: true,
});

module.exports = {
	publicPath: '/scboard24',
	outputDir: 'docs',
};
